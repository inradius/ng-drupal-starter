import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../core/service/index';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ]
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading: boolean = false;
    returnUrl: string;
    isLoggedIn: Observable<boolean>;

    constructor(
        private authService: AuthenticationService,
        private route: ActivatedRoute) {
        this.isLoggedIn = authService.isLoggedIn();
    }

    ngOnInit () {
        this.checkStatus();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    checkStatus () {
        this.authService.authStatus().subscribe(
            data => {
                // drupal user is currently logged in. What now?
            },
            err => {
                // console.error(err);
            }
        );
    }

    userLogin (): void {
        this.loading = true;
        this.authService.authLogin(this.model.username, this.model.password).subscribe(
            data => {
                // drupal user logged in, now redirect them to homepage
            },
            err => {
                if (!_.isUndefined(err._body)) {
                    err = JSON.parse(err._body);
                    err = err.message;
                }
                this.loading = false;
            });
    }

    userLogout (): void {
        this.authService.authLogout().subscribe(
            data => {
                // drupal user has logged out of Drupal and Angular. What now?
            },
            err => {
                // console.error(err);
            }
        );
    }
}
