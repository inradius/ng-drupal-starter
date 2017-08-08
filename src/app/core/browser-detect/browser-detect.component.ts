import { Component, OnInit } from '@angular/core';

import { Ng2DeviceService } from 'ng2-device-detector';

@Component({
    selector: 'app-browser-detect',
    templateUrl: 'browser-detect.component.html',
    styleUrls: [
        './browser-detect.component.css'
    ]
})
export class BrowserDetectComponent implements OnInit {
    deviceInfo: any = null;
    show: boolean = false;

    constructor(private deviceService: Ng2DeviceService) {
        this.deviceInfo = this.deviceService.getDeviceInfo();
    }

    ngOnInit (): void {
        this.checkRequirements();
    }

    checkRequirements (): void {
        // When we know minimum browser requirements, we can check for them here.
        // Set this.show to true if visitors browser does not meet minimum requirements.
        // For now, just punish all IE users.
        if (this.deviceInfo['browser'] === 'ie') {
            this.show = true;
        }
    }
}
