import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [LoginGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule),
    canActivate: [AuthGuard]
  },
  /*
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule)
  },
  */
  {
    path: 'sobre',
    loadChildren: () => import('./modal/sobre/sobre.module').then( m => m.SobrePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'torneio',
    loadChildren: () => import('./pages/torneio/torneio.module').then( m => m.TorneioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'player',
    loadChildren: () => import('./modal/player/player.module').then( m => m.PlayerPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
