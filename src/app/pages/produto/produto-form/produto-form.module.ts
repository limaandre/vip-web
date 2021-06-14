import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoFormRoutingModule } from './produto-form-routing.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    declarations: [ProdutoFormComponent],
    imports: [
        CommonModule,
        ProdutoFormRoutingModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatToolbarModule,
        MatButtonModule,
        NgxMaskModule.forRoot(maskConfig),

    ]
})
export class ProdutoFormModule { }
