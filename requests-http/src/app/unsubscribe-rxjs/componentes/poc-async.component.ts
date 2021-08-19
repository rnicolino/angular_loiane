import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy {

  nome = 'Componente com async';
  valor: string = "";

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.service.getValor()
    .pipe(tap(v => console.log(this.nome, v)))
    .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy(){
    console.log(`${this.nome} foi destruído`);
  }
}