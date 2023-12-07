import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomersService } from './customers.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
    customer: any = {}

    constructor(
        public _customersService: CustomersService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_customers();
    }

    get_customers() {
        this._customersService
        .get_customers()
        .subscribe(response => {
            this._customersService.customers = Object(response)
        })
    }

    pachValue(item: any) {
        this.customer = item
    }



}
