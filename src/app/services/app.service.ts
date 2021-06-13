import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    urlApi = 'http://192.168.0.100:3333/';

    constructor(private http: HttpClient) { }

    private request(method: string, url: string, param: object = null) {
        let request = null;

        if (method === 'get') {
            if (param) {
                url += '?' + this.objectToUrl(param);
            }
            request = this.http.get<any>(`${this.urlApi + url}`);
        } else if (method === 'post') {
            request = this.http.post(
                `${this.urlApi + url}`,
                JSON.stringify(param)
            );
        } else if (method === 'put') {
            request = this.http.put(
                `${this.urlApi + url}`,
                JSON.stringify(param)
            );
        } else if (method === 'delete') {
            if (param) {
                url += '?' + this.objectToUrl(param);
            }
            request = this.http.delete(
                `${this.urlApi + url}`
            );
        }

        return request;
    }

    private objectToUrl(object) {
        let str = '';
        for (const key of Object.keys(object)) {
            if (str !== '') {
                str += '&';
            }
            str += key + '=' + encodeURIComponent(object[key]);
        }
        return str;
    }

    cliente(cliente: Cliente, httpType: string): Observable<object> {
        return this.request(httpType, `cliente`, cliente);
    }
}
