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

  displayedResponseData: IDisplayResponseData = {
    responseTime: '',
    url: '',
    responded: '',
  }

  searchedUrls: string[] = [];

  async searchUrl(): Promise<void> {
    if (this.searchedUrls.includes(this.url)) {
      this.searchedUrls = this.searchedUrls.filter((u) => u !== this.url)
    } else if
      (this.searchedUrls.length === 3) {
      this.searchedUrls.pop();
    }
    this.searchedUrls.unshift(this.url);

    const token: string | null = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']);
    }
    else {
      const responseTime: IResponseTime = await ResponseTimeService.responseTime(this.url, token);
      if (responseTime.statusCode === 401) {
        this.router.navigate(['/']);
      }
      else {
        this.displayedResponseData = displayResponseData(responseTime);
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
