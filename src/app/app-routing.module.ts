import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'cadastro', 
    loadChildren: './pages/cadastro/cadastro.module#CadastroModule' 
  },
  { 
    path: '', 
    loadChildren: './pages/listagem/listagem.module#ListagemModule' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
