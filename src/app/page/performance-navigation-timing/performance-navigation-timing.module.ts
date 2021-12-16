import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceNavigationTimingComponent } from './performance-navigation-timing.component';
import { PerformanceNavigationTimingRoutingModule } from './performance-navigation-timing-routing.module';



@NgModule({
  declarations: [PerformanceNavigationTimingComponent],
  imports: [
    CommonModule,
    PerformanceNavigationTimingRoutingModule
  ]
})
export class PerformanceNavigationTimingModule { }
