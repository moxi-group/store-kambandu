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
import { NgxLoadingModule } from 'ngx-loading';


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
        AsideComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        LayoutModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgxLoadingModule.forRoot({
            backdropBorderRadius: "3px",
            backdropBackgroundColour: "rgba(255, 255, 255, 0.78)",
            primaryColour: "#20a8d8",
            secondaryColour: "#20a8d8",
            tertiaryColour: "#20a8d8",
        })
    ],
    providers: [
        AuthService,
        ApplicationService
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
