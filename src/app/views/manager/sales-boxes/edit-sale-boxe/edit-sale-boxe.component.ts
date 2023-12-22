import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { QuickService } from 'src/app/views/quick-options/quick.service';
import { SalesService } from '../sales.service';

@Component({
    selector: 'EditSaleBoxModal',
    templateUrl: './edit-sale-boxe.component.html',
    styleUrls: ['./edit-sale-boxe.component.scss']
})

export class EditSaleBoxeComponent implements OnInit {
    @Input() modal: any = "EditSaleBoxModal"
    @Input() title: string = "Fechar caixa de Vendas"
    @Input() openForm: FormGroup
    @Input() sale_box: any

    submitted = false

    constructor(
        public _salesService: SalesService,
        private _quickService: QuickService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.openForm = this._formBuild.group({
            closing_value: [null, Validators.required],
            closing_date: [new Date()]
        })
    }

    ngOnInit(): void {

    }

    get f() {
        return this.openForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.openForm.reset();
    }
    onSubmit() {
        this.submitted = true
        if (this.openForm.invalid) {
            return;
        }

        this._create(this.openForm.value)
    }

    _create(form: FormGroup) {

        this._salesService.close_box_sale(this.sale_box.uuid, form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Caixa fechado com sucesso!");
            this.get_sales()
            this.onReset()
        }, (error) => {
            this._applicationService.SwalDanger(error.error.detail)
            this.submitted = false
        })
    }

    get_sales() {
        this._salesService
        .get_seles_boxes()
        .subscribe(response => {
            this._salesService.sales_boxes = Object(response)
        })
    }

}
