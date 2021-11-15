import { Component, OnInit } from '@angular/core';
import { IProduto } from 'src/app/interfaces/produto';
import { ListagemProdutoService } from 'src/app/services/listagem-produto.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  produtos: IProduto;
  pageTotal: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;

  constructor(
    private listagemProdutoService: ListagemProdutoService
  ) { }

  ngOnInit() {
    this.loadProdutos(this.pageIndex);
  }

  loadProdutos(index: number) {
    this.listagemProdutoService.execute(index, this.pageSize).then((response: IProduto) => {
      this.produtos = response;
      console.log(response);
    }).finally(() => {
      this.pageTotal = this.listagemProdutoService.totalProdutos;
    });
  }

  changePage(event: number) {
    this.loadProdutos(event);
  }
}
