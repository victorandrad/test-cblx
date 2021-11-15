import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../entities/Produto';

@Injectable()
export class ListagemProdutoService {
  produtos: Produto[];
  _totalProdutos: number = 0;

  constructor(
    private http: HttpClient,
  ) { }

  execute(pageIndex?: number, pageSize?: number) {
    this.produtos = [];
    
    let params = new HttpParams()
      .set('pagina', pageIndex.toString())
      .set('tamanhoDaPagina', pageSize.toString());

    return new Promise((resolve, reject) => {
      this.http.get(`${environment.baseUrl}/lojas/${localStorage.getItem('email')}/produtos`,
        {
          params,
          headers: {
            'Accept': '*/*'
          }
        }).subscribe((response: any) => {
          let { produtos, totalDeProdutos } = response;
          
          this._totalProdutos = totalDeProdutos;

          for (let p in produtos) {
            let produto = new Produto().fill(produtos[p]);
            
            this.produtos.push(produto);
          }
          resolve(this.produtos);
        }, error => {
          reject(error);
        });
    })
  }

  get totalProdutos(): number {
    return this._totalProdutos;
  }
}
