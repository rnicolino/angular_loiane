import { Component, OnInit } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
//import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[] = [];

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  //bsModalRef: BsModalRef | undefined;

  constructor(private service: CursosService,
    //private modalService: BsModalService) { }
    private alertService: AlertModalService) { }

  ngOnInit(): void {

    //this.service.list().subscribe(dados => this.cursos = dados);
    this.onRefresh();
    
  }

  onRefresh(){
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

  handleError(){
    //this.bsModalRef = this.modalService.show(AlertModalComponent);
    //this.bsModalRef.content.type = 'danger';
    //this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';

    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

}
