import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //let registro = null;

    //this.route.params.subscribe(
    //  (params: any) => {
    //    const id = params['id'];
    //    console.log(id);
    //    const curso$ = this.service.loadByID(id);
    //    curso$.subscribe(curso => {
    //      registro = curso;
    //      this.updateForm(curso);
    //    });
    //  }
    //);

    //console.log(registro);

    /*
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.service.loadByID(id))
      )
      .subscribe(curso => this.updateForm(curso));
    */
      //concatMap -> ordem da requisição importa
      //mergeMap -> ordem não importa
      //exhaustMap -> casos de login

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  /*
  updateForm(curso: any){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }
  */

  hasError(field: string){
    return this.form.get(field)?.errors;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid){
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';

      if(this.form.value.id){
        msgSuccess = 'Curso atualziado com sucesso!'
        msgError = 'Erro ao atualizar curso, tente novamente!'
      }

      this.service.save(this.form.value).subscribe(
        success =>{
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => {
          this.modal.showAlertDanger(msgError)
        }
      );
      
      /*
      if(this.form.value.id){
        this.service.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso atualizado com sucesso!');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente!'),
          () => console.log('update completo')
        );
      }else{
        this.service.create(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso criado com sucesso!');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
          () => console.log('resquest completo')
        );
      }
      */
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    //console.log('cancel');
  }

}
