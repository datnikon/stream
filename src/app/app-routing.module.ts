import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'call/:roomId',
    loadChildren: () => import('./modules/call/call.module').then(c => c.CallModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/not-found/not-found.module').then(n => n.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
