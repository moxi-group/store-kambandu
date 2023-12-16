import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { DocumentsComponent } from './documents/documents.component';
import { ConfigurationsComponent } from './configurations.component';
import { TranslateModule } from '@ngx-translate/core';
import { CreateOrEditDocumentComponent } from './documents/create-or-edit-document/create-or-edit-document.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { TaxesComponent } from './taxes/taxes.component';
import { CreateOrEditTaxComponent } from './taxes/create-or-edit-tax/create-or-edit-tax.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { CreateOrEditPaymentMethodComponent } from './payment-methods/create-or-edit-payment-method/create-or-edit-payment-method.component';
import { CreateOrEditTemplateCompanyComponent } from './companies/create-or-edit-template-company/create-or-edit-template-company.component';
import { ListTemplateCompanyComponent } from './companies/list-template-company/list-template-company.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        ConfigurationsComponent,
        DocumentsComponent,
        CreateOrEditDocumentComponent,
        UsersComponent,
        CompaniesComponent,
        SubscriptionsComponent,
        TaxesComponent,
        CreateOrEditTaxComponent,
        PaymentMethodsComponent,
        CreateOrEditPaymentMethodComponent,

        CreateOrEditTemplateCompanyComponent,
        ListTemplateCompanyComponent
    ],

    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ConfigurationsRoutingModule,
        TranslateModule.forChild()
    ]
})

export class ConfigurationsModule { }