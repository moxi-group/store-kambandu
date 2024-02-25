import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { ProvidersComponent } from './providers/providers.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
}

@NgModule({
    declarations: [
        ProvidersComponent
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
export class ReportsModule { }
