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
    {
      path: 'console-api',
      loadChildren: () => import('./page/console-api/console-api.module').then(m => m.ConsoleApiModule)
    },
    {
      path: 'performance-api',
      loadChildren: () => import('./page/performance-api/performance-api.module').then(m => m.PerformanceAPIModule)
    },
    {
      path: 'performance-navigation-timing',
      loadChildren: () => import('./page/performance-navigation-timing/performance-navigation-timing.module').then(m => m.PerformanceNavigationTimingModule)
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
