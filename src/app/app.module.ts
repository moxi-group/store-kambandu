import { ApplicationService } from 'src/app/api/application.service';
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { LayoutModule } from './views/layout/layout.module'
import { AuthService } from './views/auth/auth.service';
import { NotFoundComponentComponent } from './views/layout/not-found-component/not-found-component.component';

import { AppComponent } from './app.component'
import { DefaultLayoutComponent } from './containers'
import { AsideComponent } from './containers/default-layout/aside/aside.component';
import { HeaderComponent } from './containers/default-layout/header/header.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { QuickSaleComponent } from './views/quick-options/quick-sale/quick-sale.component';
import { CloseSaleBoxComponent } from './views/quick-options/close-sale-box/close-sale-box.component';
import { OpenSaleBoxComponent } from './views/quick-options/open-sale-box/open-sale-box.component';


export function httpTranslateLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

const APP_CONTAINERS = [
    DefaultLayoutComponent
];

@NgModule({
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        NotFoundComponentComponent,
        HeaderComponent,
        AsideComponent,
        QuickSaleComponent,
        CloseSaleBoxComponent,
        OpenSaleBoxComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        LayoutModule,
        AppRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        AuthService,
        ApplicationService
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
