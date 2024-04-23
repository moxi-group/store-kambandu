import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesService } from '../../series/series.service';
import { InvoicesService } from '../../invoices/invoices.service';
import { ApplicationService } from 'src/app/api/application.service';
import { Router } from '@angular/router';

@Component({
    selector: 'GenerateInvoiceModal',
    templateUrl: './generate-invoice.component.html',
    styleUrls: ['./generate-invoice.component.scss']
})

export class GenerateInvoiceComponent implements OnInit {
    @Input() modal: any = "GenerateInvoiceModal"
    @Input() title: string = "Gerar fatura"
    @Input() invoice: any
    @Input() invoiceForm: FormGroup

    submitted = false
    loading: boolean = false

    series: any = []

    constructor(
        private router: Router,
        private _formBuild: FormBuilder,
        public _invoicesService: InvoicesService,
        private _applicationService: ApplicationService,
        private _seriesService: SeriesService
    ) {
        this.invoiceForm = this._formBuild.group({
            invoice_uuid: null,
            serie_uuid: null,
            description: [null, Validators.required]
        })

        this.loading_data()
    }

    ngOnInit(): void {
    }

    loading_data(){
        this.get_series()
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.title = "Gerar Fatura";
    }

    get f() {
        return this.invoiceForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.invoiceForm.reset();
    }

    onSubmit() {
        this.invoiceForm.patchValue({
            invoice_uuid: this.invoice.uuid
        })
        this._create( this.invoiceForm.value )
    }

    _create(invoice: any){
        this.loading = true
        this._invoicesService
        .convert_badget_to_invoice( invoice )
        .subscribe(response => {
            this._applicationService.SwalSuccess("Faturação feito com sucesso!");
            //this._invoicesService._print_after_create( response )
            console.log( response );
            
            this._invoicesService.reset()
            this.router.navigate(['/managers/invoices'])
        }, (error) => {            
            this._applicationService.SwalDanger(error.error.detail)
            this.loading = false
        })
    }

    get_series() {
        this._seriesService
        .get_series()
        .subscribe(response => {
            this.series = Object(response).filter((serie: any) => 
                serie.is_active === true && serie?.document?.slug === 'FT'
            )
        })
    }


}
