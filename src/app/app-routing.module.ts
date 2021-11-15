import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ListagemComponent } from './pages/listagem/listagem.component';

const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'cadastro', component: CadastroComponent },
];

@NgModule({
  declarations: [
    CadastroComponent,
    ListagemComponent
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
