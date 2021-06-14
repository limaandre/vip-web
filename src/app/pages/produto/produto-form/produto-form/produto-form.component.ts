import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoadingService } from './../../../../services/loading.service';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-produto-form',
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

    form: FormGroup = new FormGroup({
        codigoProduto: new FormControl(null, [Validators.required]),
        nome: new FormControl(null, [Validators.required]),
        fabricacao: new FormControl(null, [Validators.required]),
        tamanho: new FormControl(null, [Validators.required]),
        valor: new FormControl(null, [Validators.required]),
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
        this.appService.produto({ id }, 'get').subscribe(async (response: any) => {
            if (!response.status) {
                Swal.fire({
                    title: 'Atenção',
                    text: `Produto não encontrado`,
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                    preConfirm: async (confirm) => {
                        if (confirm) {
                            this.router.navigate(['/produto']);
                        }
                    }
                });
                return;
            }
            const data = response.data;
            this.form.get('codigoProduto').setValue(data.codigoProduto);
            this.form.get('nome').setValue(data.nome);
            this.form.get('fabricacao').setValue(data.fabricacao);
            this.form.get('tamanho').setValue(data.tamanho);
            this.form.get('valor').setValue(data.valor);
        });
    }

    cadastrar() {
            if (this.form.status === 'VALID') {
            this.appService.produto(this.form.value, 'post').subscribe(async (response: any) => {
                if (response.status) {
                    Swal.fire({
                        title: 'Atenção',
                        text: `Produto salvo com sucesso`,
                        icon: 'success',
                        confirmButtonText: 'Sim',
                        preConfirm: async (confirm) => {
                            if (confirm) {
                                this.router.navigate(['/produto']);
                            }
                        }
                    });
                }
            });
        }
    }
}
