import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { LoginComponent } from './index';

@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        UserRoutingModule,
        RouterModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule {}
