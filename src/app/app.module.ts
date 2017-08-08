import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CookieModule.forRoot(),
        HttpModule,
        CoreModule,
        SharedModule,
        AppRoutingModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
