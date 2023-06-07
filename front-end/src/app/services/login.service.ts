import { Injectable } from '@angular/core';
import { ICredentials } from '../interfaces/ICredentials';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  // Função estática para fazer login
  static async login(credentials: ICredentials): Promise<ILoginResponse> {
    try {
      // Define a URL de login
      const url: string = 'https://localhost:5001/login';

      // Faz uma requisição POST usando o axios para realizar o login
      const response: AxiosResponse = await axios.post(url, credentials);

      // Retorna os dados de resposta da requisição, incluindo o token de acesso e o status da resposta
      return { ...response.data, statusCode: response.status }
    }
    catch (error: any) {
      // Em caso de erro, retorna um objeto com o token vazio e com o status da requisição
      return { token: '', statusCode: error.response.request.status };
    }
  }
}
