import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceNavigationTimingComponent } from './performance-navigation-timing.component';

const routes: Routes = [{ path: '', component: PerformanceNavigationTimingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceNavigationTimingRoutingModule { }
