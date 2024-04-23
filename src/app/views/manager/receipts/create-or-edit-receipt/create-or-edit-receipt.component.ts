import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../customers/customers.service';
import { InvoicesService } from '../../invoices/invoices.service';
import { ReceiptsService } from '../receipts.service';
import { SeriesService } from '../../series/series.service';
import { ApplicationService } from 'src/app/api/application.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-or-edit-receipt',
    templateUrl: './create-or-edit-receipt.component.html',
    styleUrls: ['./create-or-edit-receipt.component.scss']
})

export class CreateOrEditReceiptComponent implements OnInit {

    filter: any = {
        customer_uuid: null,
        order_by: '-created_at'
    }

    receiptObject: any = {
        total_payable: 0,
        total_received: 0,
        change: 0,
        customer_uuid: null,
        serie_uuid: null,
        description: null,
        payment: {
            kind: null,
            payment_method_uuid: null,
            payment_date: new Date(),
            amount_received: 0
        },
        lines: []
    }

    customers: any = []
    invoices: any = []
    series: any = []
    lines: any = []
    payment_methods: any = []

    current_cutomer: any
    loading: boolean = false

    constructor(
        private router: Router,
        private _applicationService: ApplicationService,
        private _seriesService: SeriesService,
        public _invoicesService: InvoicesService,
        private _receiptService: ReceiptsService,
        private _customersService: CustomersService
    ) {
        this.loading_data()
    }

    ngOnInit(): void {

    }

    loading_data(){
        this.get_customers()
        this.get_series()
        this.get_payment_methods()
    }

    _reset(){
        this.loading = false

        this.receiptObject = {
            total_payable: 0,
            total_received: 0,
            change: 0,
            customer_uuid: null,
            serie_uuid: null,
            description: null,
            payment: {
                kind: null,
                payment_method_uuid: null,
                payment_date: new Date(),
                amount_received: 0
            },
            lines: []
        }
    }

    _set_received_value(target: any){
        let value = Number(target.value)
        this.receiptObject.payment.amount_received = value

        this.change_calculate()
    }

    _create(){
        this.loading = true

        this._receiptService.create( this.receiptObject )
        .subscribe(response => {
            this.loading = false
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this._reset()
            this.router.navigate(['/managers/invoices'])
        })
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
            this.series = Object(response).filter( (serie: any) => 
                serie.is_active === true && serie?.document?.slug === 'RC'
            )
        })
    }

    set_customer(target: any){
        let uuid = target.value
        let customer = this.customers.find((customer: any) => customer.uuid == uuid)
    
        if ( customer ) {
            this._reset()
            this.filter.customer_uuid = uuid
            this.receiptObject.customer_uuid = uuid

            this.get_invoices_open()
        }
    }

    get_invoices_open( ){
        this._receiptService
        .get_invoices_open( this.filter )
        .subscribe(response => {
            this.invoices = Object(response).items
        })
    }

    _add_line(event: any, invoice: any){
        let checked = event.target.checked

        if( Boolean(checked) ){
            this.receiptObject.lines.push( invoice )
        }else {
            this.receiptObject.lines = this.receiptObject.lines.filter((line: any) => line.uuid != invoice.uuid)            
        }
        
        this.calculate()
    }

    calculate(){
        let current_payable = this.receiptObject.lines.reduce((partialSum: any, line: any) => (partialSum + line.open_amount), 0 )
        this.receiptObject.total_payable = current_payable
        this.change_calculate()
        this.check_lines()
    }

    change_calculate(){
        let change = Number(this.receiptObject.payment.amount_received) - Number(this.receiptObject.total_payable) 
        this.receiptObject.change = (change <= 0) ? 0 : change
    }

    check_lines(){
        if ( !this.receiptObject.lines.length ) {
            this.receiptObject = {
                total_payable: 0,
                total_received: 0,
                change: 0,
                customer_uuid: this.receiptObject.customer_uuid,
                serie_uuid: null,
                description: null,
                payment: {
                    kind: null,
                    payment_method_uuid: null,
                    payment_date: new Date(),
                    amount_received: 0
                },
                lines: []
            }
        }
    }
    

}
