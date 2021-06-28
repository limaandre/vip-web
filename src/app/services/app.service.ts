import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    urlApi = environment.backUrl;

    constructor(private http: HttpClient) { }

    private request(method: string, url: string, param: any = null) {
        let request = null;

        if (method === 'get') {
            if (param) {
                url += '/' + param.id;
            }
            request = this.http.get<any>(`${this.urlApi + url}`);
        } else if (method === 'post') {
            request = this.http.post(
                `${this.urlApi + url}`,
                JSON.stringify(param)
            );
        } else if (method === 'put') {
            if (param && param.id) {
                url += '/' + param.id;
            }
            request = this.http.put(
                `${this.urlApi + url}`,
                JSON.stringify(param)
            );
        } else if (method === 'delete') {
            if (param) {
                url += '/' + param.id;
            }
            request = this.http.delete(
                `${this.urlApi + url}`
            );
        }

        return request;
    }

    cliente(cliente: any, httpType: string): Observable<object> {
        return this.request(httpType, `cliente`, cliente);
    }

    produto(produto: any, httpType: string): Observable<object> {
        return this.request(httpType, `produto`, produto);
    }
}
