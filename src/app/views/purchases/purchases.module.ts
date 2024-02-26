import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { ProvidersComponent } from './providers/providers.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateOrEditOrderComponent } from './orders/create-or-edit-order/create-or-edit-order.component';
import { CreateOrEditProviderComponent } from './providers/create-or-edit-provider/create-or-edit-provider.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
}

@NgModule({
    declarations: [
        ProvidersComponent,
        CreateOrEditProviderComponent,
        OrdersComponent,
        CreateOrEditOrderComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        PurchasesRoutingModule,
        TranslateModule.forChild(),
        SharedModule,
        NgWizardModule.forRoot(ngWizardConfig)
    ]
})
export class PurchasesModule { }
