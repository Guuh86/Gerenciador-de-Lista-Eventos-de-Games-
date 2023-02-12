import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./modal/sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'torneio',
    loadChildren: () => import('./pages/torneio/torneio.module').then( m => m.TorneioPageModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./modal/player/player.module').then( m => m.PlayerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
