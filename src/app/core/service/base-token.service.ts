import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export abstract class BaseTokenService {

    protected abstract TOKEN_KEY: string;
    protected abstract hasTokenBS: BehaviorSubject<boolean>;

    protected readonly DOMAIN = 'localhost';
    protected readonly SECURE = false;
    protected readonly EXPIRATION_HOURS = 4;

    constructor(protected cookieService?: CookieService) {}

    public saveToken(token: string): boolean {
        token = this.normalizeToken(token);
        if (this.cookieService) {
            this.cookieService.put(this.TOKEN_KEY, token, {
                expires: this.getExpiration(this.EXPIRATION_HOURS).toUTCString(),
                domain: this.DOMAIN,
                secure: this.SECURE
            });
        } else {
            localStorage.setItem(this.TOKEN_KEY, token);
        }
        this.hasTokenBS.next(true);
        return true;
    }

    public getToken(): string {
        if (this.cookieService) {
            return this.cookieService.get(this.TOKEN_KEY);
        } else {
            return localStorage.getItem(this.TOKEN_KEY);
        }
    }

    public removeToken(): boolean {
        console.log('removeToken-init');
        if (this.cookieService) {
            this.cookieService.remove(this.TOKEN_KEY, {
                domain: this.DOMAIN,
            });
        } else {
            localStorage.removeItem(this.TOKEN_KEY);
        }
        this.hasTokenBS.next(false);
        return true;
    }

    public hasToken(): boolean {
        if (this.cookieService) {
            return !!this.cookieService.get(this.TOKEN_KEY);
        } else {
            return !!localStorage.getItem(this.TOKEN_KEY);
        }
    }

    protected normalizeToken(token: string): string {
        return token;
    }

    protected getExpiration(hours: number): Date {
        let expiration = new Date();
        expiration.setTime(expiration.getTime() + (hours * 60 * 60 * 1000));
        return expiration;
    }
}
