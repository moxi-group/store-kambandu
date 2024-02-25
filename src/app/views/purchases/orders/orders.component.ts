import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

    constructor(
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
    }

    _print_report_invoice(){
        
    }

}
