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

    current_object_payment: any = {
        kind: null,
        payment_method_uuid: null,
        payment_date: new Date(),
        amount_received: 0
    }

    receiptObject: any = {
        total_payable: 0,
        total: 0,
        change: 0,
        customer_uuid: null,
        serie_uuid: null,
        description: null,
        payments: [],
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
            total: 0,
            change: 0,
            customer_uuid: null,
            serie_uuid: null,
            description: null,
            lines: [],
            payments: []
        }
    }

    _set_payment_method( target: any ){
        let uuid = target.value
        let payment_method = this.payment_methods.find((item: any) => item.uuid == uuid)
    
        this.current_object_payment.kind = payment_method.name
        this.current_object_payment.payment_method_uuid = payment_method.uuid        
    }

    _add_payment(){
        let payment = this.current_object_payment
        this.receiptObject.payments.push(payment)

        this.current_object_payment = {
            payment_method_uuid: null,
            payment_date: new Date(),
            amount_received: 0
        }

        this.calculate()


    }

    _create(){
        this.loading = true
        
        this._receiptService.create( this.receiptObject )
        .subscribe(response => {            
            this.loading = false
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this._reset()
            this.router.navigate(['/managers/receipts'])
        }, error => {
            console.error( error )
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

        let line_receipt = {
            invoice_uuid: invoice.uuid,
            open_amount: invoice.open_amount
        }        

        if( Boolean(checked) ){
            this.receiptObject.lines.push( line_receipt )
        }else {
            let invoices = this.receiptObject.lines.filter((line: any) => line.invoice_uuid != invoice.uuid)            
            this.receiptObject.lines = invoices
        }
        
        this.calculate()
    }

    calculate(){
        let total_received_line = this.receiptObject.payments.reduce((partialSum: any, line: any) => (Number(partialSum) + Number(line.amount_received)), 0 )
        let current_payable = this.receiptObject.lines.reduce((partialSum: any, line: any) => (Number(partialSum) + Number(line.open_amount)), 0 )

        this.receiptObject.total_payable = current_payable
        this.receiptObject.total = total_received_line

        this.change_calculate()
        this.check_lines()
    }

    change_calculate(){
        let change = Number(this.receiptObject.total) - Number(this.receiptObject.total_payable) 
        this.receiptObject.change = (change <= 0) ? 0 : change
    }

    check_lines(){
        if ( !this.receiptObject.lines.length ) {
            this.receiptObject = {
                total_payable: 0,
                total: 0,
                change: 0,
                customer_uuid: this.receiptObject.customer_uuid,
                serie_uuid: null,
                description: null,
                lines: [],
                payments: []
            }
        }
    }
    

}
