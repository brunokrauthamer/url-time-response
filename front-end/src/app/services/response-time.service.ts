import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { IHeaders } from '../interfaces/IHeaders';
import { IResponseTime } from '../interfaces/IReponseTime';

@Injectable({
  providedIn: 'root'
})
export class ResponseTimeService {

  constructor() { }

  static async responseTime(searchedUrl: string, token: string): Promise<IResponseTime> {
    try {
      const requestUrl: string = `https://localhost:5001/responsetime?url=${searchedUrl}`;
      const headers: IHeaders = { 'Authorization': `Bearer ${token}` };
      const response: AxiosResponse = await axios.get(requestUrl, { headers });
      return { ...response.data, statusCode: response.status };
    }
    catch (error: any) {
      return { statusCode: error.response.request.status }
    }
  }
}
