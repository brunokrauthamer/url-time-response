import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { IHeaders } from '../interfaces/IHeaders';
import { IResponseTime } from '../interfaces/IReponseTime';

@Injectable({
  providedIn: 'root'
})
export class ResponseTimeService {

  constructor() { }

  // Função estática para obter o tempo de resposta
  static async responseTime(searchedUrl: string, token: string): Promise<IResponseTime> {
    try {
      // Constrói a URL de requisição com a URL pesquisada
      const requestUrl: string = `https://localhost:5001/responsetime?url=${searchedUrl}`;

      // Define os headers da requisição com o token de autorização
      const headers: IHeaders = { 'Authorization': `Bearer ${token}` };

      // Faz a requisição HTTP GET usando o axios
      const response: AxiosResponse = await axios.get(requestUrl, { headers });

      // Retorna os dados de resposta da requisição, incluindo o status da resposta
      return { ...response.data, statusCode: response.status };
    }
    catch (error: any) {
      // Em caso de erro, retorna o status da requisição no objeto de resposta
      return { statusCode: error.response.request.status }
    }
  }
}
