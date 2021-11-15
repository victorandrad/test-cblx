import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CadastroProdutoService } from 'src/app/services/cadastro-produto.service';
import { CadastroComponent } from './cadastro.component';


const routes: Routes = [
  {
    path: '',
    component: CadastroComponent
  }
];

@NgModule({
  declarations: [
    CadastroComponent,
  ],
  imports: [
    CommonModule,
    NzIconModule,
    NzListModule,
    NzFormModule,
    NzEmptyModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzDatePickerModule,
    NzPaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    CadastroProdutoService
  ]
})
export class CadastroModule { }
