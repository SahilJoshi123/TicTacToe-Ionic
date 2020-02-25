import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VsComputerPage } from './vs-computer.page';

const routes: Routes = [
  {
    path: '',
    component: VsComputerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VsComputerPageRoutingModule {}
