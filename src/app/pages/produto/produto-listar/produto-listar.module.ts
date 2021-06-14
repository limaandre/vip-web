import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoListarRoutingModule } from './produto-listar-routing.module';
import { ProdutoListarComponent } from './produto-listar/produto-listar.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
@NgModule({
    declarations: [ProdutoListarComponent],
    imports: [
        CommonModule,
        ProdutoListarRoutingModule,
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
export class ProdutoListarModule { }
