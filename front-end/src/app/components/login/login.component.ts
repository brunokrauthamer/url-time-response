import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICredentials } from 'src/app/interfaces/ICredentials';
import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent {

  constructor(private router: Router, private loginService: LoginService) { }

  username: string = '';
  password: string = '';

  // Deixa a mensagem de credenciais inválidas oculta
  invalidCredentialsMessage: boolean = false;

  async login(): Promise<void> {
    // Cria um objeto com as credenciais de usuário
    const credentials: ICredentials = { username: this.username, password: this.password }

    // Obtém a resposta do servidor para a tentativa de login
    const axiosResponse = await LoginService.login(credentials);

    // Habilita a mensagem de credenciais inválidas caso sejam
    if (axiosResponse.statusCode === 404) {
      this.invalidCredentialsMessage = true;
    }

    if (axiosResponse.statusCode === 200) {
      // Desabilita a mensagem de credenciais inválidas caso sejam válidas
      this.invalidCredentialsMessage = false;

      // Armazena o token no localStorage
      localStorage.setItem('token', axiosResponse.token);

      // Redireciona a aplicação para a tela principal
      this.router.navigate(['/main']);
    }
  }

}
