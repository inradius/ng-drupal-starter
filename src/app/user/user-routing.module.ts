import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './index';

const routes: Routes = [
    {
        path: 'user', pathMatch: 'prefix',
        children: [
            { path: 'login', component: LoginComponent },
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UserRoutingModule {}
