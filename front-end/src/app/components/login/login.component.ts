import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICredentials } from 'src/app/interfaces/ICredentials';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private loginService: LoginService) { }

  username: string = '';
  password: string = '';
  async login(): Promise<void> {
    // this.router.navigate(['/main']);

    console.log(
      `usuário: ${this.username}
      senha: ${this.password}`
    )
    const credentials: ICredentials = { username: this.username, password: this.password }
    const axiosResponse = await LoginService.login(credentials);
    console.log(axiosResponse);
  }

}
