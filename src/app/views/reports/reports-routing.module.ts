import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockNalysisComponent } from './stock-nalysis/stock-nalysis.component';
import { BillingComponent } from './billing/billing.component';
import { CashMovementsComponent } from './cash-movements/cash-movements.component';
import { CustomersComponent } from './customers/customers.component';
import { SelfConsumptionComponent } from './self-consumption/self-consumption.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { VariationsComponent } from './variations/variations.component';
import { InternConsumptionsComponent } from './intern-consumptions/intern-consumptions.component';
import { ReportProductComponent } from './report-products/report-products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'stock-nalysis', component: StockNalysisComponent },
      { path: 'billigs', component: BillingComponent },
      { path: 'products', component: ReportProductComponent },

      

      { path: 'intern-consumptions', component: InternConsumptionsComponent },
      { path: 'cash-movements', component: CashMovementsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'self-consumption', component: SelfConsumptionComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'variations', component: VariationsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
