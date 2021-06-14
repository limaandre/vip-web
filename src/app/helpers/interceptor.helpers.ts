import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError, from } from 'rxjs';
import { map, catchError, finalize, mergeMap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import Swal from 'sweetalert2';
@Injectable()
export class InterceptorHelpers implements HttpInterceptor {

    constructor(
        private router: Router,
        private loadingService: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const execRequest = this.execRequest(request, next);
        return from(execRequest).pipe(
            mergeMap((req: Observable<HttpEvent<any>>) => {
                return req;
            })
        );
    }

    async execRequest(request: HttpRequest<any>, next: HttpHandler): Promise<any> {
        const async = false;

        if (next && !async) {
            await this.loadingService.loadingPresent();
        }

        let headers = new HttpHeaders();
        if (!request.url.includes('upload_imagem')) {
            headers = new HttpHeaders()
                .append('Content-Type', 'application/json');
        }
        request = request.clone({ headers });
        return this.handler(next, request, async);
    }

    handler(next, request, async) {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (!event.body.status && !async) {
                        this.trataError(event);
                    }
                    return event;
                }
            }),
            catchError(response => {
                console.log('catch', response);
                if (!async) {
                    if (response.error && !response.error.status) {
                        const errorParams = {
                            msg: response.error.msg,
                            redirect: response.error.redirect ? true : false,
                            page: response.error.redirect ? response.error.redirect : '',
                            headerError: response.error.header ? response.error.header : '',
                        };
                        this.renderError(errorParams);
                        return [];
                    }
                    this.renderError();
                }
                return [];
            }),
            finalize(() => {
                this.loadingService.loadingDismiss();
            })
        );
    }

    private trataError(event: any) {
        let redirect = false;
        let msgError = null;
        let headerError = null;

        if (event.body.msg) {
            msgError = event.body.msg;
        }

        if (event.body.redirect) {
            redirect = true;
        }

        if (event.body.headerError) {
            headerError = event.body.headerError;
        }

        const errorParams = {
            msg: msgError,
            redirect,
            page: event.body.redirect,
            headerError,
        };

        this.renderError(errorParams);
    }

    async renderError(params?) {
        const alertParams = {
            redirect: params.redirect ? params.redirect : null,
            page: params.page ? params.page : null,
            msgError: params.msg ? params.msg : 'Não é possível continuar. Tente novamente mais tarde',
            headerError: params.headerError ? params.headerError : 'Atenção',
            btnAlert: 'Entendido'
        };
        await this.showAlert(alertParams);
    }

    async showAlert(params) {
        const {
            headerError,
            msgError,
            btnAlert,
            redirect,
            page
        } = params;
        Swal.fire({
            title: headerError,
            text: msgError,
            icon: 'error',
            confirmButtonText: btnAlert,
            preConfirm: async () => {
                if (redirect && page) {
                    this.router.navigate([page]);
                }
            }
        });
    }
}
