import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoPlayerPage } from './two-player.page';

const routes: Routes = [
  {
    path: '',
    component: TwoPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoPlayerPageRoutingModule {}
