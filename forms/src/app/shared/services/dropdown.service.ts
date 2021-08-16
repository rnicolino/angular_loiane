import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cidade } from '../models/cidade';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr():Observable<EstadoBr[]>{
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );
  }

  getCargos(){
    return[
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ]
  }

  getNewsletter() {
    return [
      { valor:'s', desc: 'Sim' },
      { valor:'n', desc: 'Não' },
    ];
  }

  getFrameWorks(){
    return  [
      {frame: 'Angular'},
      {frame: 'React'},
      {frame: 'Vue'}, 
      {frame: 'Sencha'}
    ];
  }

}
