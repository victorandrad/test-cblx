import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

const routes: Routes = [
  { 
    path: 'cadastro', 
    component: CadastroComponent 
  },
  { 
    path: '', 
    loadChildren: './pages/listagem/listagem.module#ListagemModule' 
  },
];

@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
