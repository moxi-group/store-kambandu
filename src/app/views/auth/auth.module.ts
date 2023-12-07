import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AuthService } from './auth.service'
import { AuthRoutingModule } from './auth.routing.module'
import { LoginComponent } from './login/login.component'

import {TranslateModule} from '@ngx-translate/core';
import { CreateOrEditSubscriptionComponent } from './create-or-edit-subscription/create-or-edit-subscription.component'
import { SharedModule } from 'src/app/shared/shared.module'


@NgModule({

    declarations: [
        LoginComponent,
        CreateOrEditSubscriptionComponent
    ],
    exports: [
        
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        TranslateModule,
        SharedModule
    ],
    providers: [AuthService]
})
export class AuthModule {}