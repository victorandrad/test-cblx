import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduto } from '../interfaces/produto';

@Injectable()
export class DeletaProdutoService {

  constructor(
    private http: HttpClient,
  ) { }

  execute(params: IProduto) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.baseUrl}/${localStorage.getItem('email')}/${params.id}`,
        {
          headers: {
            // 'Accept': '*/*',
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Accept-Encoding": "gzip, deflate, br",
          }
        }).subscribe((response: any) => {
          resolve(response);
        }, error => {
          reject(error);
        });
    })
  }


}
