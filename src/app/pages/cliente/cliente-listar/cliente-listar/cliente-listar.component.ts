import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
    selector: 'app-cliente-listar',
    templateUrl: './cliente-listar.component.html',
    styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent implements OnInit {

    clientes: Array<Cliente>;

    constructor(
        private appService: AppService,
    ) { }

    ngOnInit() {
        this.search();
    }

    search() {
        this.appService.cliente( null, 'get').subscribe(async (response: any) => {
            console.log(response);
        });
    }

}
