import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



import { FormatCurrencyPipe } from '../pipes/currency.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
    declarations: [
        FormatCurrencyPipe,
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule
    ],
    exports: [
        FormatCurrencyPipe,
        NgxPaginationModule,
        SpinnerComponent
    ]
})

export class SharedModule { }
