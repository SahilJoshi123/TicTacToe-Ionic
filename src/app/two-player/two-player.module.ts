import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoPlayerPageRoutingModule } from './two-player-routing.module';

import { TwoPlayerPage } from './two-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TwoPlayerPageRoutingModule
  ],
  declarations: [TwoPlayerPage]
})
export class TwoPlayerPageModule {}
