import { Component, OnInit } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

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

  constructor(private service: CursosService) { }

  ngOnInit(): void {

    //this.service.list().subscribe(dados => this.cursos = dados);
    this.onRefresh();
    
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(erros => {
        console.error(erros);
        this.error$.next(true);
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

}
