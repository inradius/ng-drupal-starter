import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';
import { MenuService } from  '../service/menu.service';
import { Menu } from '../model/menu';
import { DEFAULT_NAVBAR } from './mock-navbar';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.component.css'
    ]
})
export class NavbarComponent implements OnInit {
    mainMenu: Menu[] = DEFAULT_NAVBAR;
    isLoggedIn: Observable<boolean>;
    @Input() brand: string;

    constructor (
        public authService: AuthenticationService,
        private menuService: MenuService,
        private router: Router) {
        this.isLoggedIn = authService.isLoggedIn();
    }

    ngOnInit () {
        this.menuService.getMenu('main').subscribe(
            data => {
                this.mainMenu = data;
            }
        );
    }

    authLogout () {
        this.authService.authLogout().subscribe(
            result => {
                console.log('result: ' + result);
            }
        );
        this.router.navigate(['/']);
    }
}
