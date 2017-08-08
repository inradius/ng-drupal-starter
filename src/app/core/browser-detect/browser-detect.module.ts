import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { BrowserDetectComponent } from './browser-detect.component';

@NgModule({
    declarations: [
        BrowserDetectComponent
    ],
    imports: [
        CommonModule,
        Ng2DeviceDetectorModule.forRoot()
    ],
    exports: [
        BrowserDetectComponent
    ]
})
export class BrowserDetectModule {
}
