import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-api',
  templateUrl: './performance-api.component.html',
  styleUrls: ['./performance-api.component.scss']
})
export class PerformanceApiComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  printPerformanceEntries() {
    const p = performance.getEntries();
    for (let i=0; i < p.length; i++) {
      console.log('PerformanceEntry[' + i + ']');
      this.printPerformanceEntry(p[i]);
    }
  }

  printPerformanceEntry(performanceEntry) {
    const properties = [
      'name',
      'entryType',
      'startTime',
      'duration'];

    console.group();
    properties.forEach(property => {
      // property가 있는지 확인
      if (property in performanceEntry) {
        console.log(`property ${property}: ${performanceEntry[property]}`);
      } else {
        console.log(`${property} is not suppported`);
      }
    });
    console.groupEnd();
  }

  mark(markName: string) {
    performance.mark(markName);
    console.table(performance.getEntriesByType('mark'));
  }

  measure() {
    performance.measure('markA ~ markB를 측정', 'markA', 'markB');
    console.table(performance.getEntriesByType('measure'));
  }

  clear() {
    performance.clearMarks();
    performance.clearMeasures();
  }

  printDOMHighResTimeStamp() {
    console.log(performance.now());
  }


}
