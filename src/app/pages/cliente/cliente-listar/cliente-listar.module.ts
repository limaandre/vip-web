import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteListarRoutingModule } from './cliente-listar-routing.module';
import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';


@NgModule({
  declarations: [ClienteListarComponent],
  imports: [
    CommonModule,
    ClienteListarRoutingModule
  ]
})
export class ClienteListarModule { }
