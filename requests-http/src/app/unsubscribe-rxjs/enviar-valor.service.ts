import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  private emissor$ = new Subject<string>();

  constructor() { }

  emitirValor(valor: string){
    this.emissor$.next(valor);
  }

  getValor(){
    return this.emissor$.asObservable();
  }
}
