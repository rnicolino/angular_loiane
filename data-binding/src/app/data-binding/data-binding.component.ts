import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url = 'http://loiane.com';
  cursoAngular = true;
  urlImagem = 'http://lorempixel.com/400/200/sports/1/';

  valorAtual: string = '';
  valorSalvo: string = '';
  isMouseOver: boolean = false;

  nome: string = "abc";

  pessoa: any = {
    nome: "Rodrigo",
    idade: 34,
    endereco: {
      rua: "Rua da Primavera",
      numero: 450
    }
  }

  nomeDoCurso: string = "Angular";

  valorInicial:number = 15;


  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  botaoClicado(){
    alert("Botão Clicado");
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor){
    this.valorSalvo = valor;
  }
  
  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento){
    console.log(evento.novoValor);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
