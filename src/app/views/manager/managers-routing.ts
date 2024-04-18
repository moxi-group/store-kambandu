import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { BanksComponent } from './banks/banks.component';
import { CreateOrEditInvoiceComponent } from './invoices/create-or-edit-invoice/create-or-edit-invoice.component';
import { StoresComponent } from './stores/stores.component';
import { StocksComponent } from './stocks/stocks.component';
import { EmployeesComponent } from './employees/employees.component';
import { CategoryComponent } from './category/category.component';
import { SalesBoxesComponent } from './sales-boxes/sales-boxes.component';
import { MovimentsStockComponent } from './stocks/moviments-stock/moviments-stock.component';
import { AnaliticsStockComponent } from './stocks/analitics-stock/analitics-stock.component';
import { CreateMovimentStockComponent } from './stocks/create-moviment-stock/create-moviment-stock.component';
import { SaftAoComponent } from './saft-ao/saft-ao.component';
import { InternalConsumptionComponent } from './internal-consumption/internal-consumption.component';
import { CreateOrEditReceiptComponent } from './receipts/create-or-edit-receipt/create-or-edit-receipt.component';
import { EstimatesComponent } from './estimates/estimates.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'invoices',
                component: InvoicesComponent,
                children: [],
            },
            {
                path: 'estimates',
                component: EstimatesComponent,
            },
            {
                path: 'invoices/register',
                component: CreateOrEditInvoiceComponent,
            },
            {
                path: 'receipts',
                component: ReceiptsComponent,
            },
            {
                path: 'create-receipts',
                component: CreateOrEditReceiptComponent,
            },
            {
                path: 'customers',
                component: CustomersComponent,
            },
            {
                path: 'series',
                component: SeriesComponent,
            },
            {
                path: 'products',
                component: ProductsComponent,
            },
            {
                path: 'banks',
                component: BanksComponent,
            },
            {
                path: 'stores',
                component: StoresComponent,
            },
            {
                path: 'listing-stocks',
                component: StocksComponent,
            },
            {
                path: 'moviments-stocks',
                component: MovimentsStockComponent,
            },
            {
                path: 'analitics-stocks',
                component: AnaliticsStockComponent,
            },
            {
                path: 'create-moviment-stock',
                component: CreateMovimentStockComponent,
            },
            {
                path: 'employees',
                component: EmployeesComponent,
            },
            {
                path: 'categories',
                component: CategoryComponent,
            },
            {
                path: 'caixas-vendas',
                component: SalesBoxesComponent,
            },
            {
                path: 'safts',
                component: SaftAoComponent,
            },
            {
                path: 'internal-consumption',
                component: InternalConsumptionComponent,
            },
        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagersRoutingModule {}
