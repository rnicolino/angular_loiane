import { Component, OnInit, ViewChild } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[] = [];

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  //bsModalRef: BsModalRef | undefined;

  cursoSelecionado!: Curso;

  constructor(private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    //this.service.list().subscribe(dados => this.cursos = dados);
    this.onRefresh();

  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(erros => {
          console.error(erros);
          //this.error$.next(true);
          this.handleError()
          return empty();
        })
      );

    this.service.list()
      .pipe(
        //map(),
        //tap(),
        //switchMap(),
        catchError(error => empty())
      )
      .subscribe(
        dados => {
          console.log(dados)
        },
        //error => console.log(error),
        //() => console.log("Observable compleo!")
      );
  }

  handleError() {
    //this.bsModalRef = this.modalService.show(AlertModalComponent);
    //this.bsModalRef.content.type = 'danger';
    //this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';

    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: Curso){
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal,{class: 'modal-sm'});
  }

  onConfirmDelete(): void {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => this.onRefresh(),
      error => this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
    );
    this.deleteModalRef.hide();
  }
 
  onDeclineDelete(): void {
    this.deleteModalRef.hide();
  }

}
