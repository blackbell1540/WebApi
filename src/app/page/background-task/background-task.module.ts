import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundTaskComponent } from './background-task.component';
import { BackgroundTaskRoutingModule } from './background-task-routing.module';



@NgModule({
  declarations: [BackgroundTaskComponent],
  imports: [
    CommonModule,
    BackgroundTaskRoutingModule
  ]
})
export class BackgroundTaskModule { }
