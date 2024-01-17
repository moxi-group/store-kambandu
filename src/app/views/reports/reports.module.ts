import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { StockNalysisComponent } from './stock-nalysis/stock-nalysis.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagersRoutingModule } from '../manager/managers-routing';
import { ReportsRoutingModule } from './reports-routing.module';
import { BillingComponent } from './billing/billing.component';
import { CashMovementsComponent } from './cash-movements/cash-movements.component';
import { VariationsComponent } from './variations/variations.component';
import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SelfConsumptionComponent } from './self-consumption/self-consumption.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
}

@NgModule({
  declarations: [
    ReportsComponent,
    StockNalysisComponent,
    BillingComponent,
    CashMovementsComponent,
    VariationsComponent,
    CustomersComponent,
    SuppliersComponent,
    SelfConsumptionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
    NgWizardModule.forRoot(ngWizardConfig)
  ]
})
export class ReportsModule { }
