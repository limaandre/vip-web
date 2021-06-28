import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoadingService } from './../../../../services/loading.service';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-cliente-form',
    templateUrl: './cliente-form.component.html',
    styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

    form: FormGroup = new FormGroup({
        codigoCliente: new FormControl(null, [Validators.required]),
        nome: new FormControl(null, [Validators.required]),
        cpf: new FormControl(null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        sexo: new FormControl(null, [Validators.required]),
    });

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        public loadingService: LoadingService
    ) { }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params.id;
        if (id) {
            this.getUser(id);
        }
    }

    getUser(id) {
        this.appService.cliente({ id }, 'get').subscribe(async (response: any) => {
            if (!response.status) {
                Swal.fire({
                    title: 'Atenção',
                    text: `Cliente não encontrado`,
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                    preConfirm: async (confirm) => {
                        if (confirm) {
                            this.router.navigate(['/cliente']);
                        }
                    }
                });
                return;
            }
            const data = response.data;
            this.form.get('codigoCliente').setValue(data.codigoCliente);
            this.form.get('nome').setValue(data.nome);
            this.form.get('cpf').setValue(data.CPF);
            this.form.get('email').setValue(data.email);
            this.form.get('sexo').setValue(data.sexo);
        });
    }

    cadastrar() {
        if (this.form.status === 'VALID') {
            const id = this.activatedRoute.snapshot.params.id;
            const values = this.form.value;
            let typeHttp = 'post';
            if (id) {
                typeHttp = 'put';
            }
            values.id = id;
            this.appService.cliente(values, typeHttp).subscribe(async (response: any) => {
                if (response.status) {
                    Swal.fire({
                        title: 'Atenção',
                        text: `Cliente salvo com sucesso`,
                        icon: 'success',
                        confirmButtonText: 'Sim',
                        preConfirm: async (confirm) => {
                            if (confirm) {
                                this.router.navigate(['/cliente']);
                            }
                        }
                    });
                }
            });
        }
    }

    emailErroMensagem() {
        const emailForm = this.form.get('email');
        if (emailForm.hasError('required')) {
            return 'Campo é obrigatório';
        }
        return emailForm.hasError('email') ? 'Não é um e-mail válido' : '';
    }

    cpfErroMensagem() {
        const cpfForm = this.form.get('cpf');
        if (cpfForm.hasError('required')) {
            return 'Campo é obrigatório';
        }
        return cpfForm.status === 'INVALID' ? 'CPF inválido' : '';
    }

}
