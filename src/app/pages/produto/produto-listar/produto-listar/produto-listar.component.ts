import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../../../../services/loading.service';
import { Produto } from 'src/app/interfaces/produto.interface';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-produto-listar',
    templateUrl: './produto-listar.component.html',
    styleUrls: ['./produto-listar.component.scss']
})
export class ProdutoListarComponent implements AfterViewInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    displayedColumns: string[] = ['codigoProduto', 'nome', 'fabricacao', 'tamanho', 'valor', 'editar', 'excluir'];
    dataRequest: Array<Produto> = [];
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
        this.appService.produto(null, 'get').subscribe(async (response: any) => {
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
                text: `Tem certeza que deseja remover o produto?`,
                icon: 'warning',
                confirmButtonText: 'Sim',
                showCancelButton: true,
                cancelButtonText: `Não`,
                preConfirm: async (confirm) => {
                    if (confirm) {
                        this.appService.produto({ id: row.id }, 'delete').subscribe(async (response: any) => {
                            if (response.status) {
                                const dataFiltered = this.dataSource.filteredData.filter(item => {
                                    return item.id !== row.id;
                                });
                                this.dataSource = new MatTableDataSource<any>(dataFiltered);
                                this.dataSource.paginator = this.paginator;
                                this.confirmRemove();
                            }
                        });
                    }
                }
            });

        }
    }

    confirmRemove() {
        Swal.fire({
            title: 'Atenção',
            text: `Produto removido com sucesso`,
            icon: 'success',
            confirmButtonText: 'Entendido'
        });
    }

    goEdit(row) {
        if (row.id) {
            this.router.navigate([`/produto/form/${row.id}`]);
        }
    }

    validaTextoFabricacao(fabricacao) {
        switch (fabricacao) {
            case 'n':
                return 'Nacional';
            case 'i':
                return 'Importado';
            default:
                return fabricacao;
        }
    }
}
