import { Component } from '@angular/core';
import { LoginContainer } from '../login-container/login-container';
import { CadastroContainer } from '../cadastro-container/cadastro-container';

@Component({
  selector: 'app-login-cadastro-page',
  imports: [LoginContainer, CadastroContainer],
  templateUrl: './login-cadastro-page.html',
  styleUrl: './login-cadastro-page.css',
})
export class LoginCadastroPage {

}
