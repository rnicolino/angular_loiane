import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'',
    pathMatch: 'full',
    redirectTo: 'cursos'
  },
  {
    path: 'cursos',
    loadChildren: './cursos/cursos.module#CursosModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
