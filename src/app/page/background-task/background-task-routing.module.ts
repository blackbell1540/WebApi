import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundTaskComponent } from './background-task.component';

const routes: Routes = [
  { path: '', component: BackgroundTaskComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BackgroundTaskRoutingModule { }
