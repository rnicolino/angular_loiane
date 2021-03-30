import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from './../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  aluno: any;
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoseService: AlunosService
  ) { }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params:any) => {
        let id = params['id'];

        this.aluno = this.alunoseService.getAluno(id);
      }
    );
     
  }

  editarContato(){
    this.router.navigate(['/alunos', this.aluno.id,'editar']);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
