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

  handleUrlChange() {
    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?(\?([\w.-]+=[\w.-]+&?)*)?(#(\w*))?$/;
    if (this.url.match(urlRegex)) this.isButtonDisabled = false;
    else this.isButtonDisabled = true;
  }

  displayedResponseData: IDisplayResponseData = {
    responseTime: '',
    url: '',
    responded: '',
    date: '',
  }

  searchedInfo: IDisplayResponseData[] = [];

  async searchUrl(): Promise<void> {
    this.urlToRequest = this.url;
    this.url = '';
    this.isButtonDisabled = true;
    this.loading = true;
    if
      (this.searchedInfo.length === 4) {
      this.searchedInfo.pop();
    }

    const token: string | null = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']);
    }
    else {
      const responseTime: IResponseTime = await ResponseTimeService.responseTime(this.urlToRequest, token);
      if (responseTime.statusCode === 401) {
        this.router.navigate(['/']);
      }
      else {
        this.displayedResponseData = displayResponseData(responseTime);
        this.searchedInfo.unshift(this.displayedResponseData);
        this.loading = false;
      }
    }
  }

  async searchSavedUrl(event: any): Promise<void> {
    this.url = event.target.innerText;
    await this.searchUrl();
  }

  onLogout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('token');
  }
}
