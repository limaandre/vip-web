import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from './../../../../services/loading.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cliente-listar',
    templateUrl: './cliente-listar.component.html',
    styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent implements AfterViewInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    displayedColumns: string[] = ['codigoCliente', 'nome', 'cpf', 'email', 'sexo', 'editar', 'excluir'];
    dataRequest: Array<Cliente> = [];
    dataSource: any;

    constructor(
        private router: Router,
        private appService: AppService,
        public loadingService: LoadingService
    ) { }

    ngAfterViewInit() {
        this.search();
    }

    search() {
        this.appService.cliente(null, 'get').subscribe(async (response: any) => {
            if (response.status) {
                this.dataSource = new MatTableDataSource<any>(response.data);
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    remove(row) {
        if (row.id) {
            Swal.fire({
                title: 'Atenção',
                text: `Tem certeza que deseja remover o cliente?`,
                icon: 'warning',
                confirmButtonText: 'Sim',
                showCancelButton: true,
                cancelButtonText: `Não`,
                preConfirm: async (confirm) => {
                    if (confirm) {
                        this.appService.cliente({ id: row.id }, 'delete').subscribe(async (response: any) => {
                            if (response.status) {
                                const dataFiltered = this.dataSource.filteredData.filter(item => {
                                    return item.id !== row.id;
                                });
                                this.dataSource = new MatTableDataSource<any>(dataFiltered);
                                this.dataSource.paginator = this.paginator;
                            }
                        });
                    }
                }
            });

        }
    }

    goEdit(row) {
        if (row.id) {
            this.router.navigate([`/cliente/form/${row.id}`]);
        }
    }

    validaTextoSexo(sexo) {
        switch (sexo) {
            case 'm':
                return 'Masculino';
            case 'f':
                return 'Feminino';
            case 'o':
                return 'Outros';
            default:
                return '';
        }
    }
}
