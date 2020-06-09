import { Injectable, EventEmitter } from '@angular/core';

import { LogService } from './../shared/log.service';

@Injectable()

export class CursosService{

    emitirCursoCriado = new EventEmitter<string>();
    static criouCursoNovo = new EventEmitter<string>();

    private cursos: string[] = ['Java','Angular','ADVPL'];

    constructor(private logService: LogService){
        console.log('CursosService');
    }

    getCursos(){
        //return ['Java','Angular','ADVPL'];
        this.logService.consoleLog('Obtendo Lista de Cursos');
        return this.cursos;
    }

    addCurso(curso: string){
        this.logService.consoleLog(`Criando um novo curso: ${curso}`);
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouCursoNovo.emit(curso);
    }
}