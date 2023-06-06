import { Component } from '@angular/core';
import { ResponseTimeService } from 'src/app/services/response-time.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor() { }

  url: string = '';

  searchedUrls: string[] = [];

  async searchUrl(): Promise<void> {
    console.log(this.url);
    if (this.searchedUrls.length === 3) {
      this.searchedUrls.pop();
    }
    this.searchedUrls.unshift(this.url);
    const token = localStorage.getItem('token') as string
    const axiosResponse = await ResponseTimeService.responseTime(this.url, token)
    console.log(axiosResponse);
  }

  savedUrlSearch(event: any): void {
    console.log(event.target.innerText);
    this.url = event.target.innerText;
  }
}
