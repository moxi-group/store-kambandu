import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoicesService } from '../../invoices.service';
import { ApplicationService } from 'src/app/api/application.service';


@Component({
    selector: 'AddQuantiteModal',
    templateUrl: './add-quantity-invoice.component.html',
})

export class AddQuantityInvoiceComponent implements OnInit {
    @Input() modal: any = "AddQuantiteModal"
    @Input() title: string = "Adicionar Quantidade"
    @Input() product: any
    @Input() lineForm: FormGroup

    submitted = false
    total: number = 0
    total_without_tax: number = 0
    total_tax: number = 0

    documents: any = []

    constructor(
        private _applicationService: ApplicationService,
        private _invoicesService: InvoicesService,
        private _formBuild: FormBuilder
    ) {
        this.lineForm = this._formBuild.group({
            quantity: [null, Validators.required]
        })
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        return
    }

    get f() {
        return this.lineForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.lineForm.reset();
    }

    onSubmit() {
        this.submitted = true

        if (this.lineForm.invalid) {
            return
        }

        let _replace_line = this._replace_line_product( this.product )

        if (_replace_line) {
            return
        }

        let quantity = this.lineForm.value.quantity
        let total_without_tax = (this.product.price * quantity)
        let total_tax = ((total_without_tax * this.product.tax.percentage)/100)
        let total = (total_without_tax + total_tax)

        this.product.quantity = quantity
        this.product.total_without_tax = total_without_tax
        this.product.total_tax = total_tax
        this.product.total = total

        let line = this._remove_property(this.product)
        
        this._invoicesService.invoiceObject.lines.push(line)
        this._invoicesService.full_calculation()

        this.onReset()
        this._applicationService.CloseModal('AddQuantiteModal')

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

    _replace_line_product(product: any){
        return this._invoicesService.invoiceObject.lines.some( (line: any) => {
            if( line.uuid === product.uuid ){
                return true
            }
            return false
        })
    }


}
