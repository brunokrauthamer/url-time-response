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

  invalidCredentialsMessage: boolean = false;

  async login(): Promise<void> {

    const credentials: ICredentials = { username: this.username, password: this.password }
    const axiosResponse = await LoginService.login(credentials);
    console.log(axiosResponse);

    if (axiosResponse.statusCode === 404) {
      this.invalidCredentialsMessage = true;
    }

    if (axiosResponse.statusCode === 200) {
      this.invalidCredentialsMessage = false;

      localStorage.setItem('token', axiosResponse.token);

      this.router.navigate(['/main']);
    }
  }

}
