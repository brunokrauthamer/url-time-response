import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor() { }

  url: string = '';

  searchedUrls: string[] = [];

  searchUrl(): void {
    console.log(this.url);
    if (this.searchedUrls.length === 3) {
      this.searchedUrls.pop();
    }
    this.searchedUrls.unshift(this.url);
  }

  savedUrlSearch(event: any): void {
    console.log(event.target.innerText);
    this.url = event.target.innerText;
  }
}
