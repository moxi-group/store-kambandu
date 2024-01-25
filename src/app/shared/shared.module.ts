import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormatCurrencyPipe } from '../pipes/currency.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterComponent } from './components/filter/filter.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
    declarations: [
        FormatCurrencyPipe,
        SpinnerComponent,
        FilterComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule
    ],
    exports: [
        FormatCurrencyPipe,
        NgxPaginationModule,
        SpinnerComponent,
        FilterComponent,
        LoadingComponent
    ]
})

export class SharedModule { }
