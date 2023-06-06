import { Injectable } from '@angular/core';
import { ICredentials } from '../interfaces/ICredentials';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  static async login(credentials: ICredentials): Promise<ILoginResponse> {
    try {
      const url: string = 'https://localhost:5001/login';
      const response: AxiosResponse = await axios.post(url, credentials);
      return { ...response.data, statusCode: response.status }
    }
    catch (error: any) {
      return { token: '', statusCode: error.response.request.status };
    }
  }
}
