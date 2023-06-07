import { Component } from '@angular/core';
import { ResponseTimeService } from 'src/app/services/response-time.service';
import { Router } from '@angular/router';
import { IDisplayResponseData } from 'src/app/interfaces/IResponseData';
import { IResponseTime } from 'src/app/interfaces/IReponseTime';
import { displayResponseData } from 'src/app/utils/displayReponseData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private router: Router) { }

  url: string = '';
  urlToRequest: string = '';

  isButtonDisabled: boolean = true;

  loading: boolean = false;

  // Função chamada quando ocorre uma alteração no campo de URL
  handleUrlChange(): void {
    // Expressões regulares para validar o formato da URL
    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?(\?([\w.-]+=[\w.-]+&?)*)?(#(\w*))?$/;
    const localHostRegex = /http:\/\/localhost:\d+/;


    // Verifica se a URL informada corresponde ao formato esperado e habilita/desabilita o botão de pesquisa
    if (this.url.match(urlRegex) || this.url.match(localHostRegex)) this.isButtonDisabled = false;
    else this.isButtonDisabled = true;
  }

  displayedResponseData: IDisplayResponseData = {
    responseTime: '',
    url: '',
    responded: '',
    date: '',
  }

  searchedInfo: IDisplayResponseData[] = [];

  // Função assíncrona para pesquisar a URL
  async searchUrl(): Promise<void> {
    // Armazena a URL a ser pesquisada
    this.urlToRequest = this.url;

    // Limpa o campo de pesquisa
    this.url = '';

    // Bloqueia o botão de pesquisa
    this.isButtonDisabled = true;

    // Mostra o ícone de processamento na tela
    this.loading = true;

    // Remove a última entrada da lista de informações pesquisadas se houver 4 entradas
    if (this.searchedInfo.length === 4) {
      this.searchedInfo.pop();
    }

    // Recupera o token de usuário do localStorage
    const token: string | null = localStorage.getItem('token');

    // Redireciona para a tela de login caso não exista token armazenado
    if (!token) {
      this.router.navigate(['/']);
    }
    else {
      // Faz a requisição de tempo de resposta para o servidor
      const responseTime: IResponseTime = await ResponseTimeService.responseTime(this.urlToRequest, token);

      // Redireciona para a tela de login caso o token seja inválido
      if (responseTime.statusCode === 401) {
        this.router.navigate(['/']);
      }
      else {
        // Adiciona as informações obtidas pelo servidor na tela
        this.displayedResponseData = displayResponseData(responseTime);
        this.searchedInfo.unshift(this.displayedResponseData);

        // Remove o ícone de processamento da tela
        this.loading = false;
      }
    }
  }

  // Realiza uma pesquisa para uma URL salva no histórico
  async searchSavedUrl(event: any): Promise<void> {
    this.url = event.target.innerText;
    await this.searchUrl();
  }

  // Retorna para a tela de login e apaga o token do localStorage
  onLogout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('token');
  }
}
