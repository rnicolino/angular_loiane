import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  httpClient: any;

  onSubmit(form){
    console.log(form);
    //console.log(this.usuario);

    this.http.post('https://httpbin.org/post',JSON.stringify(form.value))
    .subscribe(dados => {
      console.log(dados)
      form.form.reset();
    });
  }

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
    ) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo){
    return{
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep, form){

    cep = cep.replace(/\D/g,'');

    if (cep != null && cep !== '') {

      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados, formulario) {
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        //cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    
    //console.log(formulario);
    
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
