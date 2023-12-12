import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/api/application.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { SeriesService } from '../../manager/series/series.service';
import { InvoicesService } from '../../manager/invoices/invoices.service';
import { CustomersService } from '../../manager/customers/customers.service';
import { ProductsService } from '../../manager/products/products.service';

@Component({
    selector: 'app-quick-sale',
    templateUrl: './quick-sale.component.html',
    styleUrls: ['./quick-sale.component.scss']
})
export class QuickSaleComponent implements OnInit {

    loading = false
    disabled_btn_submit = false
    active_payment_line = false

    payment_methods: any = []
    customers: any = []
    series: any = []
    products: any = []

    constructor(
        private router: Router,
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

    remove_line(uuid: string){
        this._invoicesService.invoiceObject.lines = this._invoicesService.invoiceObject.lines
        .filter((line: any) => line.uuid != uuid)
        this._invoicesService.full_calculation()
    }
    
    _search_produt(target: any){
        let code = target.value
        let product = this.products.find((item: any) => item.code == code)

        //let product = this.products.find((item: any) => item.code != null && item.code.startsWith(code))

        if (product != undefined && product != null){
            this.disabled_btn_submit = true

            let quantity = 1
            let total_without_tax = (product.price * quantity)
            let total_tax = ((total_without_tax * product.tax.percentage)/100)
            let total = (total_without_tax + total_tax)
    
            product.quantity = quantity
            product.total_without_tax = total_without_tax
            product.total_tax = total_tax
            product.total = total

            let line = this._remove_property( product)
            //this._invoicesService.invoiceObject.lines.push(line)

            this._invoicesService.add_or_update_lines( product )

            this._invoicesService.full_calculation()
        }else{
            this.disabled_btn_submit = false
        }
    }

    _submitte_invoice(){
        let is_valid_form = this._validations()
        if ( is_valid_form ) {
            this._create()
        }
    }

    _create() {      
        this.loading = true  
        this._invoicesService.create(this._invoicesService.invoiceObject)
        .subscribe(response => {
            this._invoicesService._print_after_create( response )
            this._applicationService.SwalSuccess("Faturação feito com sucesso!");
            this.loading = false
        }, (error) => {            
            this._applicationService.SwalDanger(error.error.detail)
            this.loading = false
        })
    }



    _validations(){
        //================ validar cliente
        if ( !this._invoicesService.invoiceObject.customer_uuid ) {
            this._applicationService.SwalDanger("Por favor selecionar cliente");
            return false
        }

        //================ validar serie
        if ( !this._invoicesService.invoiceObject.serie_uuid ) {
            this._applicationService.SwalDanger("Por favor selecionar Série");
            return false
        }

        //================ validar linhas
        if ( !this._invoicesService.invoiceObject.lines.length ) {
            this._applicationService.SwalDanger("Por favor adicionar linhas na fatura");
            return false
        }

        return true
    }


    _remove_property(line: any){
        delete line.description
        delete line.is_active
        delete line.created_at
        delete line.updated_at
        delete line.saved_by

        delete line.tax.uuid
        delete line.tax.is_active
        delete line.tax.created_at
        delete line.tax.updated_at
        delete line.tax.saved_by

        return line
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


    set_customer(target: any){
        let uuid = target.value
        this._invoicesService.customer = this.customers.find((customer: any) => customer.uuid == uuid)
    }

    set_serie(target: any){
        let uuid = target.value
        this._invoicesService.serie = this.series.find((serie: any) => serie.uuid == uuid)
    }

    set_payment_method(target: any){
        let uuid = target.value
        let payment = this.payment_methods.find((item: any) => item.uuid === uuid )
        this._invoicesService.total_received = this._invoicesService.total

        let payload_payment = {
            kind: payment.name,
            payment_method_uuid: payment.uuid,
            payment_date: new Date(),
            amount_received: this._invoicesService.total
        }
        
        this._invoicesService.invoiceObject.payment_lines = [payload_payment]
    }

    get_payment_methods(){
        this._invoicesService
        .get_payment_methods()
        .subscribe(response => {
            this.payment_methods = Object(response)
        })
    }

    get_series() {
        this._seriesService
        .get_series()
        .subscribe(response => {
            this.series = Object(response).filter((serie: any) => serie?.document?.slug === 'FR')
        })
    }

    get_customers() {
        this._customersService
        .get_customers()
        .subscribe(response => {
            this.customers = Object(response).filter((item: any) => item.nif === "999999999")
        })
    }

    get_products() {
        this._productsService
        .get_products()
        .subscribe(response => {
            this.products = Object(response)
        })
    }
}
