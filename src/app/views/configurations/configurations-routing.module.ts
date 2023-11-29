import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { TaxesComponent } from './taxes/taxes.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'subscriptions',
                component: SubscriptionsComponent
            },
            {
                path: 'companies',
                component: CompaniesComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'documents',
                component: DocumentsComponent
            },
            {
                path: 'taxes',
                component: TaxesComponent
            },
            {
                path: 'payment_methods',
                component: PaymentMethodsComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ConfigurationsRoutingModule {}
