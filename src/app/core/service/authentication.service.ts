import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DrupalService } from './drupal.service';

@Injectable()
export class AuthenticationService extends DrupalService {

    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    authLogin (username: string, password: string) {
        let body = JSON.stringify({ name: username, pass: password });
        const resource = 'user/login';
        return this.httpPost(resource, body)
            .map((response: Response) => {
                let auth = response.json();
                if (auth && auth.logout_token) {
                    this.isLoginSubject.next(true);
                    localStorage.setItem('currentDrupalUser', JSON.stringify(auth));
                }
            });
    }

    authLogout () {
        const resource = 'user/logout';
        return this.httpGet(resource)
            .map((response: Response) => {
                if (response.status === 200) {
                    localStorage.removeItem('currentDrupalUser');
                    this.isLoginSubject.next(false);
                }
            });
    }

    authStatus () {
        // If user logs out of Drupal, we need to know in Angular
        const resource = 'user/login_status';
        return this.httpGet(resource)
            .map((response: Response) => {
                let status: boolean = false;
                if (response['_body'] === '1') {
                    status = true;
                }
                return <boolean>status;
            });
    }

    isLoggedIn (): Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }

    private hasToken (): boolean {
        return !!localStorage.getItem('currentDrupalUser');
    }
}
