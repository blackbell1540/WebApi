import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-navigation-timing',
  templateUrl: './performance-navigation-timing.component.html',
  styleUrls: ['./performance-navigation-timing.component.scss']
})
export class PerformanceNavigationTimingComponent implements OnInit {


  public performancEntry = {
     initiatorType:'',
     domComplete: '',
     domContentLoadedEventEnd: '',
     domContentLoadedEventStart: '',
     domInteractive: '',
     loadEventEnd: '',
     loadEventStart: '',
     redirectCount: '',
     requestStart: '',
    responseStart: '',
     type: '',
     unloadEventEnd: '',
     unloadEventStart: ''
  }

  constructor() { }

  ngOnInit(): void {
    this.showPerformanceNavigationTimingProperties();
  }

  showPerformanceNavigationTimingProperties() {
    const performanceEntries = performance.getEntriesByType('navigation');

    for (let i = 0; i < performanceEntries.length; i++) {
      console.log('= Navigation entry[' + i + ']');
      this.performancEntry = performanceEntries[i] as any;
    }
  }

}
