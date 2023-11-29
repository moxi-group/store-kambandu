import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


import { FormatCurrencyPipe } from '../pipes/currency.pipe';



@NgModule({
    declarations: [
        FormatCurrencyPipe
    ],
    imports: [

    ],
    exports: [
        FormatCurrencyPipe,
    ]
})

export class SharedModule { }
