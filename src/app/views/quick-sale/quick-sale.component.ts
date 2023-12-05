import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../manager/customers/customers.service';
import { InvoicesService } from '../manager/invoices/invoices.service';
import { SeriesService } from '../manager/series/series.service';
import { ApplicationService } from 'src/app/api/application.service';
import { ProductsService } from '../manager/products/products.service';

@Component({
    selector: 'app-quick-sale',
    templateUrl: './quick-sale.component.html',
    styleUrls: ['./quick-sale.component.scss']
})
export class QuickSaleComponent implements OnInit {

    submitted = false
    active_payment_line = false

    payment_methods: any = []
    customers: any = []
    series: any = []
    products: any = []

    constructor(
        private _applicationService: ApplicationService,
        private _seriesService: SeriesService,
        public _invoicesService: InvoicesService,
        private _customersService: CustomersService,
        private _productsService: ProductsService,
    ) {
        this.loading_data()
    }

    ngOnInit(): void {
    }
    
    loading_data(){
        this.get_customers()
        this.get_series()
        this.get_products()
    }
    
    _search_produt(target: any){
        let code = target.value
        let product = this.products.find((item: any) => item.code.startsWith(code))

        console.log( product )
    }

    get_products() {
        this._productsService
        .get_products()
        .subscribe(response => {
            this.products = Object(response)
        })
    }

    get_customers() {
        this._customersService
        .get_customers()
        .subscribe(response => {
            this.customers = Object(response)
        })
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

    get_payment_methods(){
        this._invoicesService
        .get_payment_methods()
        .subscribe(response => {
            this.payment_methods = Object(response)
        })
    }
}
