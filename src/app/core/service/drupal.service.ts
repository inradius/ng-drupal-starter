import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { MAIN } from '../../shared/constant/main';

@Injectable()
export class DrupalService extends BaseService {

    protected apiServer = MAIN.APP.DRUPAL_API.API_SERVER;
    protected X_CSFR_Token_Key = 'X-CSRF-Token';
    protected X_CSFR_Token = '';

    constructor (protected http: Http) {
        super(http);
    }

    protected getEndpoint (resource: string): string {
        return this.apiServer + (resource.substr(0, 1) === '/' ? '' : '/') + resource;
    }

    protected httpPost(resource: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>(observer => {

            let customOptions = new RequestOptions({headers: new Headers({
                'Content-Type' : 'application/json',
            })});
            if (this.X_CSFR_Token) {
                customOptions.headers.set(this.X_CSFR_Token_Key, this.X_CSFR_Token);
            }
            super.httpPost(resource, body, customOptions.merge(options))
                .map(response => { return response; })
                .catch(error => this.handleError(error))
                .subscribe(
                    data => {
                        observer.next(data);
                        observer.complete();
                    },
                    error => {
                        if (error.indexOf(this.X_CSFR_Token_Key) !== -1) {
                            this.getToken().subscribe(
                                token => {
                                    this.X_CSFR_Token = token as string;
                                    customOptions.headers.set(this.X_CSFR_Token_Key, this.X_CSFR_Token);
                                    super.httpPost(resource, body, customOptions.merge(options))
                                        .map(response => { return response; })
                                        .catch(error2 => this.handleError(error2))
                                        .subscribe(
                                            data2 => {
                                                observer.next(data2);
                                                observer.complete();
                                            },
                                            error2 => {
                                                observer.error(error2);
                                            }
                                        );
                                },
                                tokenError => {
                                    observer.error(tokenError);
                                }
                            );
                        } else {
                            observer.error(error);
                        }
                    }
                );
        });
    }

    protected httpPut(resource: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let customOptions = new RequestOptions({headers: new Headers({ 'Content-Type' : 'application/json' })});
        return super.httpPut(resource, body, customOptions.merge(options));
    }

    protected httpPatch(resource: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let customOptions = new RequestOptions({headers: new Headers({ 'Content-Type' : 'application/json' })});
        return super.httpPatch(resource, body, customOptions.merge(options));
    }

    protected getDefaultParams(urlSearchParams?: URLSearchParams): URLSearchParams {
        let params: URLSearchParams = super.getDefaultParams(urlSearchParams);
        params.append('_format', 'json');
        return params;
    }

    public getToken(): Observable<Object> {
        let resource = 'session/token';
        return this.httpGet(resource)
            .map(response => { return response.text(); })
            .catch(error => this.handleError(error));
    }
}
