import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ManagersRoutingModule } from './managers-routing';

import { ManagersComponent } from './managers.component';
import { SeriesComponent } from './series/series.component';
import { CreateOrEditSerieComponent } from './series/create-or-edit-serie/create-or-edit-serie.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CreateOrEditInvoiceComponent } from './invoices/create-or-edit-invoice/create-or-edit-invoice.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { CreateOrEditReceiptComponent } from './receipts/create-or-edit-receipt/create-or-edit-receipt.component';
import { ProductsComponent } from './products/products.component';
import { CreateOrEditProductComponent } from './products/create-or-edit-product/create-or-edit-product.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateOrEditCustomerComponent } from './customers/create-or-edit-customer/create-or-edit-customer.component';
import { BanksComponent } from './banks/banks.component';
import { CreateOrEditBankComponent } from './banks/create-or-edit-bank/create-or-edit-bank.component';
import { AddQuantityInvoiceComponent } from './invoices/create-or-edit-invoice/add-quantity-invoice/add-quantity-invoice.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCustomerAndInvoiceKindComponent } from './invoices/create-or-edit-invoice/add-customer-and-invoice-kind/add-customer-and-invoice-kind.component';
import { AddProductInvoiceComponent } from './invoices/create-or-edit-invoice/add-product-invoice/add-product-invoice.component';
import { StoresComponent } from './stores/stores.component';
import { CreateOrEditStoreComponent } from './stores/create-or-edit-store/create-or-edit-store.component';
import { StocksComponent } from './stocks/stocks.component';
import { CreateMovimentStockComponent } from './stocks/create-moviment-stock/create-moviment-stock.component';
import { ListMovimentStockComponent } from './stocks/list-moviment-stock/list-moviment-stock.component';
import { EmployeesComponent } from './employees/employees.component';
import { CreateOrEditEmployeeComponent } from './employees/create-or-edit-employee/create-or-edit-employee.component';
import { AddUserToStoreComponent } from './employees/add-user-to-store/add-user-to-store.component';
import { CategoryComponent } from './category/category.component';
import { CreateOrEditCategoryComponent } from './category/create-or-edit-category/create-or-edit-category.component';
import { CancelInvoiceComponent } from './invoices/cancel-invoice/cancel-invoice.component';
import { SalesBoxesComponent } from './sales-boxes/sales-boxes.component';
import { EditSaleBoxeComponent } from './sales-boxes/edit-sale-boxe/edit-sale-boxe.component';
import { ComposerProductComponent } from './stocks/composer-product/composer-product.component';
import { MovimentsStockComponent } from './stocks/moviments-stock/moviments-stock.component';
import { AnaliticsStockComponent } from './stocks/analitics-stock/analitics-stock.component';
import { SaftAoComponent } from './saft-ao/saft-ao.component';
import { GenerateSaftComponent } from './saft-ao/generate-saft/generate-saft.component';
import { InternalConsumptionComponent } from './internal-consumption/internal-consumption.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { EstimatesComponent } from './estimates/estimates.component';
import { GenerateInvoiceComponent } from './estimates/generate-invoice/generate-invoice.component';
import { DocTemplatesComponent } from './doc-templates/doc-templates.component';
import { CreateOrEditTemplateCompanyComponent } from './doc-templates/create-or-edit-template-company/create-or-edit-template-company.component';





const ngWizardConfig: NgWizardConfig = {
    theme: THEME.default
}

@NgModule({
    declarations: [
        ManagersComponent,
        SeriesComponent,
        CreateOrEditSerieComponent,

        InvoicesComponent,
        CreateOrEditInvoiceComponent,
        AddCustomerAndInvoiceKindComponent,
        AddProductInvoiceComponent,
        CancelInvoiceComponent,

        AddQuantityInvoiceComponent,
        ReceiptsComponent,
        CreateOrEditReceiptComponent,
        ProductsComponent,
        CreateOrEditProductComponent,
        CustomersComponent,
        CreateOrEditCustomerComponent,
        BanksComponent,
        CreateOrEditBankComponent,

        StoresComponent,
        CreateOrEditStoreComponent,

        ListMovimentStockComponent,
        ComposerProductComponent,

        EmployeesComponent,
        CreateOrEditEmployeeComponent,
        AddUserToStoreComponent,

        CategoryComponent,
        CreateOrEditCategoryComponent,

        SalesBoxesComponent,
        EditSaleBoxeComponent,

        StocksComponent,
        CreateMovimentStockComponent,
        MovimentsStockComponent,
        AnaliticsStockComponent,
        SaftAoComponent,
        GenerateSaftComponent,

        SaftAoComponent,
        GenerateSaftComponent,

        InternalConsumptionComponent,
        EstimatesComponent,
        GenerateInvoiceComponent,

        DocTemplatesComponent,
        CreateOrEditTemplateCompanyComponent
    ],

    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgSelectModule,
        NgOptionHighlightModule,
        ReactiveFormsModule,
        ManagersRoutingModule,
        TranslateModule.forChild(),
        SharedModule,
        NgWizardModule.forRoot(ngWizardConfig)
    ]
})

export class ManagersModule { }
