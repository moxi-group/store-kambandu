import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import { ArchwizardModule } from 'angular-archwizard'

import { SiteRoutingModule } from './site-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';

FullCalendarModule.registerPlugins([
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin
])

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SiteRoutingModule,
        FullCalendarModule,
        ArchwizardModule
    ],
    declarations: [ 
        HomeComponent,
        NavbarComponent
    ],
    providers: [
        
    ]
})
export class SiteModule { }
