import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public buttons = [
    'background-tasks',
    'console-api',
    'performance-api',
    'performance-navigation-timing'
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public nav(page: string) {
    this.router.navigate([page]);
  }
}
