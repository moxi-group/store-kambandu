import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoicesService } from '../invoices.service';
import { ApplicationService } from 'src/app/api/application.service';


@Component({
    selector: 'CancelInvoiceModal',
    templateUrl: './cancel-invoice.component.html',
    styleUrls: ['./cancel-invoice.component.scss']
})

export class CancelInvoiceComponent implements OnInit {
    @Input() modal: any = "CancelInvoiceModal"
    @Input() title: string = "Anular Fatura"
    @Input() invoice: any
    @Input() cancelForm: FormGroup

    submitted = false

    constructor(
        private _applicationService: ApplicationService,
        private _invoicesService: InvoicesService,
        private _formBuild: FormBuilder
    ) {
        this.cancelForm = this._formBuild.group({
            invoice_uuid: null,
            description: [null, Validators.required]
        })
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.title = "Anular Fatura";
    }

    get f() {
        return this.cancelForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.cancelForm.reset();
    }

    onSubmit() {
        this._update(this.cancelForm.value)
    }

    _update(form: FormGroup){
        this.cancelForm.value.invoice_uuid = this.invoice.uuid

        this._invoicesService.cancel(form)
        .subscribe(res => {
            this.submitted = false;
            this.get_invoices()
            this._applicationService.SwalSuccess("Fatura Anulada com sucesso!");
            this.onReset()
        })
    }

    get_invoices() {
        this._invoicesService
        .get_invoices()
        .subscribe(response => {
            this._invoicesService.invoices = Object(response)
        })
    }

}
