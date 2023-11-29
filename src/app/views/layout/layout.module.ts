import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        //NavbarComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        //NavbarComponent
    ]
})
export class LayoutModule { }
