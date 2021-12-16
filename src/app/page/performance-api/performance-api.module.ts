import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceApiComponent } from './performance-api.component';
import { PerformanceApiRoutingModule } from './performance-api-routing.module';



@NgModule({
  declarations: [PerformanceApiComponent],
  imports: [
    CommonModule,
    PerformanceApiRoutingModule
  ]
})
export class PerformanceAPIModule { }
