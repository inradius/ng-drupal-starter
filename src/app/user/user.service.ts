import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { DrupalService } from '../core/service/drupal.service';
import { User } from './user';

@Injectable()
export class UserService extends DrupalService {

    getUser(uid: number): Observable<User> {
        const resource = 'user/' + uid;
        return this.httpGet(resource)
            .map((response) => this.extractData(response))
            .catch((error) => this.handleError(error));
    }
}
