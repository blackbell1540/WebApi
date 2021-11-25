import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleApiComponent } from './console-api.component';
import { ConsoleApiRoutingModule } from './console-api-routing.module';



@NgModule({
  declarations: [ConsoleApiComponent],
  imports: [
    CommonModule,
    ConsoleApiRoutingModule
  ]
})
export class ConsoleApiModule { }
