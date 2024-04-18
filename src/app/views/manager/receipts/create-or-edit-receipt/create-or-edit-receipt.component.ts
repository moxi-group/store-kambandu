import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../customers/customers.service';
import { InvoicesService } from '../../invoices/invoices.service';
import { ReceiptsService } from '../receipts.service';

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

    customers: any = []
    invoices: any = []
    lines: any = []
    payment_methods: any = []

    current_cutomer: any
    total_received: number = 0
    total_payable: number = 0

    payment: any = {
        kind: null,
        payment_method_uuid: null,
        payment_date: new Date(),
        amount_received: 0
    }

    constructor(
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
        this.get_payment_methods()

    }

    _set_received_value(target: any){
        let value = Number(target.value)
        
        console.log( value );
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

    set_customer(target: any){
        let uuid = target.value
        let customer = this.customers.find((customer: any) => customer.uuid == uuid)
    
        if ( customer ) {
            this.filter.customer_uuid = uuid
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

    _add_line(target: any, invoice: any){

        console.log(target);
        
        this.lines.push( invoice )
        this.calculate()
    }

    calculate(){
        this.total_payable = this.lines.reduce((partialSum: any, line: any) => (partialSum + line.open_amount), 0 )

    }

}
