import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgPipesModule } from 'ngx-pipes/esm';
import { BrowserDetectModule } from './index';
import { throwIfAlreadyLoaded } from './module-import-guard';
import {
    AuthenticationService,
    DrupalService
} from './service/index';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '-lang.json');
}

@NgModule({
    imports: [
        CommonModule,
        NgPipesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        BrowserDetectModule
    ],
    declarations: [],
    exports: [
        NgPipesModule,
        TranslateModule,
        BrowserDetectModule
    ],
    providers: [
        DrupalService,
        AuthenticationService
    ],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
