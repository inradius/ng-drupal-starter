import { Injectable } from '@angular/core';
import { DrupalService } from './drupal.service';

@Injectable()
export class UserService extends DrupalService {

    getLoginStatus () {
        const resource = 'user/login_status';
        return this.httpGet(resource)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUserById (id: number) {
        const resource = 'user/' + id;
        return this.httpGet(resource)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
