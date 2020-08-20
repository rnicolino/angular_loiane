import { Component, OnInit } from '@angular/core';

import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms: Hone your skills by learning classic data structures and algorithms in JavaScript, 2nd Edition (English Edition) eBook Kindle',
    rating: 4.9,
    numeroPaginas: 453,
    preco: 256.99,
    dataLancamento: new Date(2020,6,9),
    url: 'http://a.co/7KICIUB'
  };

  livros: string[] = ['Angular','Java','ADVPL'];
  filtro: string;

  constructor() { }

  ngOnInit(): void {
  }

  addCurso(valor){
    this.livros.push(valor);
  }

  obterCursos(){

    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }

    return this.livros.filter((v) => {
      if(v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0){
        return true;
      }
      return false;
    });
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor Assíncrono'), 2000)
  });

  valorAsync2 = interval(2000).pipe(map(valor => 'Valor Assíncrono 2'));
}

