import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-cblx';
  loginForm: FormGroup;
  messageError: string;
  logged: boolean = false;

  constructor(
    public router: Router,
    private modalService: NzModalService,
  ) {
    this.logged = !!localStorage.getItem('email');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  login() {
    this.messageError = undefined;

    let { email, password } = this.loginForm.controls;

    if (email.errors) {
      if (email.errors.required) {
        this.messageError = 'O campo de e-mail é obrigatório.';
      } else if (email.errors.email) {
        this.messageError = 'Você deve digitar um e-mail válido.';
      }
    } else if (password.errors) {
      if (password.errors.required) {
        this.messageError = 'O campo de senha é obrigatório.';
      }
    } else {
      this.logged = !!email;
      localStorage.setItem('email', email.value);
      this.loginForm.reset();
    }
  }

  logout() {
    this.modalService.confirm({
      nzTitle: 'Aviso',
      nzContent: 'Tem certeza que deseja fazer logout?',
      nzOkText: 'Sim',
      nzCancelText: 'Não',
      nzOnOk: () => {
        this.logged = false;
        localStorage.clear();
      }
    });

  }

  afterClose() {
    this.messageError = undefined;
  }
}
