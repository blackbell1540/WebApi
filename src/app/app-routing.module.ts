import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'index'
    },
    {
      path: 'index',
      loadChildren: () => import('./page/index/index.module').then(m => m.IndexModule)
    },
    {
      path: 'background-task',
      loadChildren: () => import('./page/background-task/background-task.module').then(m => m.BackgroundTaskModule)
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
