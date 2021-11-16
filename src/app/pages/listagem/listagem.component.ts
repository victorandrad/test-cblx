import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { IProduto } from 'src/app/interfaces/produto';
import { DeletaProdutoService } from 'src/app/services/deleta-produto.service';
import { EditaProdutoService } from 'src/app/services/edita-produto.service';
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
  isVisibleEdit: boolean = false;
  itemDetail: IProduto;
  produtoForm: FormGroup;

  constructor(
    public listagemProdutoService: ListagemProdutoService,
    public deletaProdutoService: DeletaProdutoService,
    public editaProdutoService: EditaProdutoService,
    private modalService: NzModalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadProdutos(this.pageIndex);

    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      validade: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
    });
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

  showModalDetails(item: IProduto) {
    this.isVisibleDetails = true;
    this.itemDetail = item;
  }

  showModalEdit(item: IProduto) {
    this.isVisibleEdit = true;
    this.itemDetail = item;
    this.produtoForm.patchValue({
      nome: item.nome,
      descricao: item.descricao,
      tipo: item.tipo.toString(),
      validade: item.dataDeValidade,
      preco: item.precoDeVenda,
      quantidade: item.quantidade,
    })
  }

  handleCancel() {
    this.isVisibleDetails = false;
    this.isVisibleEdit = false;
    this.itemDetail = undefined;
  }

  handleOk() {
    this.isVisibleDetails = false;
    this.isVisibleEdit = false;
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
          
          this.modalService.success({
            nzTitle: 'Aviso',
            nzContent: 'Produto deletado com sucesso!'
          });
        })
      }
    });
  }

  submitForm(): void {
    if (this.produtoForm.valid) {
      let { nome, descricao, tipo: tipoProduto, validade, preco: precoDeVenda, quantidade } = this.produtoForm.value;
      let dataDeValidade = this.formatDate(validade);
      let emailDaLoja = localStorage.getItem('email');
      let tipo = parseInt(tipoProduto);
      let id = this.itemDetail.id;

      this.editaProdutoService.execute({ id, nome, descricao, tipo, dataDeValidade, precoDeVenda, quantidade, emailDaLoja }).then(response => {
        this.produtoForm.reset();
        this.isVisibleEdit = false;
        this.loadProdutos(this.pageIndex = 1);

        this.modalService.success({
          nzTitle: 'Aviso',
          nzContent: 'Produto editado com sucesso!'
        });
        
      });

    } else {
      this.isVisibleEdit = true;

      Object.values(this.produtoForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  formatDate(_date) {
    let date = new Date(_date),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
}
