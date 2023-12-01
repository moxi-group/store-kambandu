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
import { ProvidersComponent } from './providers/providers.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'invoices',
                component: InvoicesComponent,
                children: [

                ]
            },
            {
                path: 'invoices/register',
                component: CreateOrEditInvoiceComponent
            },
            {
                path: 'receipts',
                component: ReceiptsComponent
            },
            {
                path: 'customers',
                component: CustomersComponent
            },
            {
                path: 'series',
                component: SeriesComponent
            },
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: 'banks',
                component: BanksComponent
            },
            {
                path: 'stores',
                component: StoresComponent
            },
            {
                path: 'providers',
                component: ProvidersComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ManagersRoutingModule {}
