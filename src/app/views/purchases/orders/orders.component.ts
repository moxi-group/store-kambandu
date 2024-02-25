import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrdersService } from './orders.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

    loading: boolean = false
    provider: any = {}

    constructor(
        public _orderService: OrdersService,
        public translate: TranslateService
    ) {

    }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_providers();
    }

    
    _print_report_invoice(){
        
    }

    get_providers() {
        this.loading = true
        this._orderService
        .get_orders()
        .subscribe(response => {
            this._orderService.orders = Object(response)
            this.loading = false
        })
    }

    pachValue(item: any) {
        this.provider = item
    }


}
