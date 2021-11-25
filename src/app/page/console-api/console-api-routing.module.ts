import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleApiComponent } from './console-api.component';

const routes: Routes = [{ path: '', component: ConsoleApiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleApiRoutingModule { }
