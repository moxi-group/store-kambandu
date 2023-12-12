import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/api/application.service';
import { QuickService } from '../quick.service';

@Component({
    selector: 'CloseSaleBoxModal',
    templateUrl: './close-sale-box.component.html',
    styleUrls: ['./close-sale-box.component.scss']
})

export class CloseSaleBoxComponent implements OnInit {

    @Input() modal: any = "CloseSaleBoxModal"
    @Input() title: string = "Fechar caixa de Vendas"
    @Input() openForm: FormGroup

    submitted = false

    open: any = {}

    constructor(
        private _quickService: QuickService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.openForm = this._formBuild.group({
            opening_value: [null, Validators.required],
            opening_date: [new Date()]
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
        this._quickService.open_sale_box(form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Caixa aberto com sucesso!");
            this.onReset()
        }, (error) => {
            this._applicationService.SwalDanger(error.error.detail)
            this.submitted = false
        })
    }
}
