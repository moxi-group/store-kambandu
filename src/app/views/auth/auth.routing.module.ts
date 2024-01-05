import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { CreateOrEditSubscriptionComponent } from './create-or-edit-subscription/create-or-edit-subscription.component'
import { ChangePasswordComponent } from './change-password/change-password.component'


const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: 'subscriptions',
        component: CreateOrEditSubscriptionComponent
    }
]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }