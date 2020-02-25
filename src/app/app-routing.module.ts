import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'two-player',
    loadChildren: () => import('./two-player/two-player.module').then( m => m.TwoPlayerPageModule)
  },
  {
    path: 'vs-computer',
    loadChildren: () => import('./vs-computer/vs-computer.module').then( m => m.VsComputerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
