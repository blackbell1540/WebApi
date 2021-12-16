import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceApiComponent } from './performance-api.component';

const routes: Routes = [{ path: '', component: PerformanceApiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceApiRoutingModule { }
