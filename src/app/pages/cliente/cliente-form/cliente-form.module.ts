import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteFormRoutingModule } from './cliente-form-routing.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
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
    declarations: [ClienteFormComponent],
    imports: [
        CommonModule,
        ClienteFormRoutingModule,
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
export class ClienteFormModule { }
