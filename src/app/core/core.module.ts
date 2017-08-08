import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgPipesModule } from 'ngx-pipes/esm';
import {
    AlertModule,
    BrowserDetectModule
} from './index';
import {
    AlertService,
    AuthenticationService,
    DrupalService
} from './service/index';
import { throwIfAlreadyLoaded } from './module-import-guard';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '-lang.json');
}

@NgModule({
    imports: [
        NgPipesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        AlertModule,
        BrowserDetectModule
    ],
    declarations: [],
    exports: [
        NgPipesModule,
        TranslateModule,
        AlertModule,
        BrowserDetectModule
    ],
    providers: [
        AlertService,
        DrupalService,
        AuthenticationService
    ],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
