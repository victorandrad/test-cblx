import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroProdutoService } from 'src/app/services/cadastro-produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroProdutoService: CadastroProdutoService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      validade: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      let { nome, descricao, tipo: tipoProduto, validade, preco: precoDeVenda, quantidade } = this.validateForm.value;
      let dataDeValidade = this.formatDate(validade);
      let emailDaLoja = localStorage.getItem('email');
      let tipo = parseInt(tipoProduto);
      this.cadastroProdutoService.execute({ nome, descricao, tipo, dataDeValidade, precoDeVenda, quantidade, emailDaLoja }).then(response => {
        console.log(response);
        this.validateForm.reset();
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
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
