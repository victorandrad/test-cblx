import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduto } from '../interfaces/produto';

@Injectable()
export class EditaProdutoService {

  constructor(
    private http: HttpClient,
  ) { }

  execute(params: IProduto) {
    console.log(params);
    
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.baseUrl}/${localStorage.getItem('email')}/${params.id}`, params,
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
