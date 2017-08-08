import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Error } from '../model/error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export abstract class BaseService {

    constructor (protected http: Http) {}

    protected abstract getEndpoint (resource: string): string;

    protected httpRequest(resource: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.request((resource instanceof Request ? resource : this.getEndpoint(<string>resource)),
            this.getDefaultOptions(options));
    }

    protected httpGet(resource: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.getEndpoint(resource), this.getDefaultOptions(options));
    }

    protected httpPost(resource: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.getEndpoint(resource), body, this.getDefaultOptions(options));
    }

    protected httpPut(resource: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.put(this.getEndpoint(resource), body, this.getDefaultOptions(options));
    }

    protected httpDelete(resource: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.delete(this.getEndpoint(resource), this.getDefaultOptions(options));
    }

    protected httpPatch(resource: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.patch(this.getEndpoint(resource), body, this.getDefaultOptions(options));
    }

    protected getDefaultParams(urlSearchParams?: URLSearchParams): URLSearchParams {
        let defaultParams: URLSearchParams = new URLSearchParams();
        if (urlSearchParams) { defaultParams.appendAll(urlSearchParams); }
        return defaultParams;
    }

    protected getDefaultHeaders(headers?: Headers): Headers {
        let defaultHeaders = new Headers(headers);
        defaultHeaders.append('Accept', 'application/json');
        return defaultHeaders;
    }

    protected getDefaultOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        let defaultOptions = new RequestOptions();
        defaultOptions.headers = this.getDefaultHeaders(options && options.headers ?  options.headers as Headers : null);
        defaultOptions.params = this.getDefaultParams(options && options.params ? options.params as URLSearchParams : null);
        defaultOptions.method = options && options.method ? options.method : null;
        defaultOptions.body = options && options.body ? options.body : null;
        defaultOptions.url = options && options.url ? options.url : null;
        defaultOptions.responseType = options && options.responseType ? options.responseType : null;
        defaultOptions.withCredentials =  false;
        return defaultOptions;
    }

    protected extractData(response: Response): any {
        if (response.text().length === 0) { return {}; }
        let body = response.json();
        return body.data || body;
    }

    protected getObjectFromResponse<T>(response: Response, className): T {
        let data = this.extractData(response);
        return this.createObject<T>(className, data);
    }

    protected getArrayFromResponse<T>(response: Response, className): T[] {
        let data = this.extractData(response);
        let result = [];
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                result.push(this.createObject<T>(className, data[i]));
            }
        }
        return result;
    }

    protected createObject<T>(className: new (param) => T, param: any): T {
        return new className(param);
    }

    protected clone<T>(obj: T) {
        return <T>JSON.parse(JSON.stringify(obj));
    }

    protected handleError(error: Response | Error | any) {
        if (error instanceof Error) {
            return Observable.throw(error);
        } else {
            let errMsg = '';
            if (this.extractError) {
                errMsg = this.extractError(error);
            } else {
                errMsg = BaseService.prototype.extractError(error);
            }
            if (error instanceof Response) {
                return Observable.throw(new Error({
                    code: '' + error.status,
                    message: errMsg
                }));
            } else {
                return Observable.throw(errMsg);
            }
        }
    }

    protected extractError(error: Response | any): string {
        let errMsg: string = null;
        if (error instanceof Response) {
            if (error.text().length === 0) {
                errMsg = error.status + ' ' + error.statusText;
            } else {
                const body = error.json();
                errMsg = body.message || body.error;
                if (body.parameters) {
                    let parameters = body.parameters;
                    if (parameters instanceof Array) {
                        for (let i = 0; i < parameters.length; i++) {
                            errMsg = errMsg.replace('%' + ( i + 1 ), parameters[i]);
                        }
                    } else {
                        for (let key in parameters) {
                            if (parameters.hasOwnProperty(key)) {
                                errMsg = errMsg.replace('%' + key, parameters[key]);
                            }
                        }
                    }
                }
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        if (!errMsg) { errMsg = 'System error'; }
        return errMsg;
    }
}
