import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  login(): void {
    console.log(
      `usuário: ${this.username}
      senha: ${this.password}`
    )
  }

}
