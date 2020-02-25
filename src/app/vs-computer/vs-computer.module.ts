import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VsComputerPageRoutingModule } from './vs-computer-routing.module';

import { VsComputerPage } from './vs-computer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VsComputerPageRoutingModule
  ],
  declarations: [VsComputerPage]
})
export class VsComputerPageModule {}
