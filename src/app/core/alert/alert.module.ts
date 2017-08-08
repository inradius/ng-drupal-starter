import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        AlertComponent
    ]
})
export class AlertModule {}
