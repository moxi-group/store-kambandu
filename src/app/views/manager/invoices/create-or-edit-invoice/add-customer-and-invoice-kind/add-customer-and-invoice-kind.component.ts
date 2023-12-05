import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomersService } from '../../../customers/customers.service';
import { ApplicationService } from 'src/app/api/application.service';
import { SeriesService } from '../../../series/series.service';
import { InvoicesService } from '../../invoices.service';

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer-and-invoice-kind.component.html',
    styleUrls: ['./add-customer-and-invoice-kind.component.scss']
})

export class AddCustomerAndInvoiceKindComponent implements OnInit {

    submitted = false
    active_payment_line = false

    payment_methods: any = []
    customers: any = []
    series: any = []

    constructor(
        private _applicationService: ApplicationService,
        private _seriesService: SeriesService,
        public _invoicesService: InvoicesService,
        private _customersService: CustomersService,
    ) {
        this.loading_data()
    }

    ngOnInit(): void {
    }


    loading_data(){
        this.get_customers()
        this.get_series()
    }

    _check_serie(target: any){
        let uuid = target.value
        let serie = this.series.find((item: any) => item.uuid === uuid)

        if (serie.document.slug === 'FR') {
            this.get_payment_methods()
            this.active_payment_line = true
        }else{
            this.active_payment_line = false
            this.payment_methods = []
        }
    }

    get_payment_methods(){
        this._invoicesService
        .get_payment_methods()
        .subscribe(response => {
            this.payment_methods = Object(response)
        })
    }

    get_customers() {
        this._customersService
        .get_customers()
        .subscribe(response => {
            this.customers = Object(response)
        })
    }

    get_series() {
        this._seriesService
        .get_series()
        .subscribe(response => {
            this.series = Object(response)
        })
    }

    set_customer(target: any){
        let uuid = target.value
        this._invoicesService.customer = this.customers.find((customer: any) => customer.uuid == uuid)
    }

    set_serie(target: any){
        let uuid = target.value
        this._invoicesService.serie = this.series.find((serie: any) => serie.uuid == uuid)
    }

}
