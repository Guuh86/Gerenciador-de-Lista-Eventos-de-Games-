import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneioPageRoutingModule } from './torneio-routing.module';

import { TorneioPage } from './torneio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneioPageRoutingModule
  ],
  declarations: [TorneioPage]
})
export class TorneioPageModule {}
