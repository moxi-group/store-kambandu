import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../products/products.service';
import { InvoicesService } from '../../invoices.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'add-product-invoice',
    templateUrl: './add-product-invoice.component.html',
    styleUrls: ['./add-product-invoice.component.scss']
})
export class AddProductInvoiceComponent implements OnInit {

    products: any = []
    payment_methods: any = []
    product: any = {}
    active_payment_line: Boolean = false

    payment: any = {
        kind: null,
        payment_method_uuid: null,
        payment_date: new Date(),
        amount_received: 0
    }
    constructor(
        private _applicationService: ApplicationService,
        public _invoicesService: InvoicesService,
        private _productsService: ProductsService
    ) {
        this.loading_data()
    }

    ngOnInit(): void {

    }


    loading_data(){
        this.get_products()
        this.get_payment_methods()
    }


    _add_payment_line(){
        let is_valid_form = this._validations(this.payment)

        if ( is_valid_form ) {
            this._invoicesService.invoiceObject.payment_lines.push(this.payment)
            this._invoicesService.total_received = (Number(this._invoicesService.total_received) + Number(this.payment.amount_received))
    
            let pay_met = this.payment_methods.find((item: any) => item.uuid === this.payment.payment_method_uuid)
            this.payment.kind = pay_met.name
    
            this.payment = {
                kind: null,
                payment_method_uuid: null,
                payment_date: new Date(),
                amount_received: 0
            }
        }

    }

    _validations(payment: any){
        //================ validar
        if ( !payment.payment_method_uuid ) {
            this._applicationService.SwalDanger("Selecionar Forma de pagamento");
            return false
        }

        if ( !payment.payment_date ) {
            this._applicationService.SwalDanger("Selecionar data do pagamento");
            return false
        }

        if ( payment.amount_received <= 0 ) {
            this._applicationService.SwalDanger("Valor a pagar deve ser superior");
            return false
        }

        return true
    }

    

    remove_payment_line(uuid: string){
        this._invoicesService.invoiceObject.payment_lines = this._invoicesService.invoiceObject.payment_lines
        .filter((line: any) => line.payment_method_uuid != uuid)
        this._invoicesService.full_calculation()
    }

    get_products() {
        this._productsService
        .get_products()
        .subscribe(response => {
            this.products = Object(response)
        })
    }

    patchProduct(product: any){
        this.product = product
    }

    remove_line(uuid: string){
        this._invoicesService.invoiceObject.lines = this._invoicesService.invoiceObject.lines
        .filter((line: any) => line.uuid != uuid)
        this._invoicesService.full_calculation()
    }



    get_payment_methods(){
        this._invoicesService
        .get_payment_methods()
        .subscribe(response => {
            this.payment_methods = Object(response)
        })
    }

}
