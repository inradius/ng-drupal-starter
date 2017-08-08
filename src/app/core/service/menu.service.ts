import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DrupalService } from './drupal.service';
import { Menu } from '../model/menu';

@Injectable()
export class MenuService extends DrupalService {

    private resource = 'entity/rest/menu/';

    getMenu (name: string): Observable<Menu[]> {
        return this.httpGet(this.resource + name)
            .map(response => this.extractData(response))
            .catch(error => this.handleError(error));
    }
}
