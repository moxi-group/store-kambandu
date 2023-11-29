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
        CreateOrEditPaymentMethodComponent
    ],

    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ConfigurationsRoutingModule,
        TranslateModule.forChild(),

        /*
        NgxSpinnerModule,
        NgxLoadingModule.forRoot({
        backdropBorderRadius: "3px",
        backdropBackgroundColour: "rgba(255, 255, 255, 0.78)",
        primaryColour: "#20a8d8",
        secondaryColour: "#20a8d8",
        tertiaryColour: "#20a8d8",
        })
        */

    ]
})

export class ConfigurationsModule { }