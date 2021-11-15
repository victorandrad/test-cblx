import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { IProduto } from 'src/app/interfaces/produto';
import { DeletaProdutoService } from 'src/app/services/deleta-produto.service';
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
  isVisibleDetails: boolean = false;
  itemDetail: IProduto;

  constructor(
    public listagemProdutoService: ListagemProdutoService,
    public deletaProdutoService: DeletaProdutoService,
    private modalService: NzModalService,
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
    this.pageIndex = event;
    this.loadProdutos(event);
  }

  showModal(item: IProduto) {
    this.isVisibleDetails = true;
    this.itemDetail = item;
  }

  handleCancel() {
    this.isVisibleDetails = false;
    this.itemDetail = undefined;
  }

  handleOk() {
    this.isVisibleDetails = false;
    this.itemDetail = undefined;
  }

  deleteProduto(item): void {
    this.modalService.warning({
      nzTitle: 'Aviso',
      nzContent: 'Tem certeza que deseja apagar esse produto?',
      nzOkText: 'Sim',
      nzCancelText: 'Não',
      nzOnOk: () => {
        console.log('deletou');
        this.deletaProdutoService.execute(item).then(() => {
          this.loadProdutos(this.pageIndex = 1);
        })
      }
    });
  }
}
