import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { DeletaProdutoService } from 'src/app/services/deleta-produto.service';
import { ListagemProdutoService } from 'src/app/services/listagem-produto.service';
import { ListagemComponent } from './listagem.component';


const routes: Routes = [
  {
    path: '',
    component: ListagemComponent
  }
];

@NgModule({
  declarations: [
    ListagemComponent,
  ],
  imports: [
    CommonModule,
    NzListModule,
    NzIconModule,
    NzEmptyModule,
    NzModalModule,
    NzButtonModule,
    NzPaginationModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ListagemProdutoService,
    DeletaProdutoService
  ]
})
export class ListagemModule { }
