import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./lazy-modules/home.module').then(h => h.HomeModule)
  },
  {
    path: 'call/:roomId',
    loadChildren: () => import('./lazy-modules/call.module').then(c => c.CallModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
