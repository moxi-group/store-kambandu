import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ManagerRolesComponent } from './manager-roles/manager-roles.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        DashboardComponent,
        ManagerRolesComponent
    ],
    imports: [
        FormsModule,
        DashboardRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        CommonModule,
        TranslateModule.forChild()
    ]
})

export class DashboardModule { }
