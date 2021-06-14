import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteListarRoutingModule } from './cliente-listar-routing.module';
import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
    declarations: [ClienteListarComponent],
    imports: [
        CommonModule,
        ClienteListarRoutingModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
    ]
})
export class ClienteListarModule { }
