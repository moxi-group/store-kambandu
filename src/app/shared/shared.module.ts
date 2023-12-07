import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



import { FormatCurrencyPipe } from '../pipes/currency.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
    declarations: [
        FormatCurrencyPipe,
        SpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormatCurrencyPipe,
        SpinnerComponent
    ]
})

export class SharedModule { }
