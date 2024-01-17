import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { TaxesService } from '../taxes.service';

@Component({
    selector: 'createOrEditTax',
    templateUrl: './create-or-edit-tax.component.html',
    styleUrls: ['./create-or-edit-tax.component.scss']
})

export class CreateOrEditTaxComponent implements OnInit {

    @Input() modal: any = "CreateOrEditTaxModal"
    @Input() title: string = "Registar Imposto"
    @Input() tax: any

    submitted = false
    private loading = false

    @Input() taxForm: FormGroup;

    constructor(
        private _taxService: TaxesService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder,
    ) {
        this.taxForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            description: [null, Validators.required],
            code: [null, Validators.required],
            percentage: [0, Validators.required]
        });
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.tax !== undefined) {
            this.title = "Registar Imposto";
            this.taxForm.patchValue(this.tax);
        } else {
            this.title = "Atualizar Imposto";
        }
    }

    get f() {
        return this.taxForm.controls
    }

    onReset() {
        this.submitted = false;
        this.taxForm.reset()
    }

    onSubmit() {
        this.submitted = true
        if (this.taxForm.invalid) {
            return;
        }
    
        this.loading = true

        if ( Boolean(this.taxForm.getRawValue().uuid) ) {
            this._update(this.taxForm.getRawValue().uuid, this.taxForm.value)
        } else {
            this._create(this.taxForm.value)
        }
    }

    _create(form: FormGroup) {
        this._taxService.create(form)
        .subscribe(response => {
            this._applicationService.CloseModal('createOrEditTax')
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(url: any, form: FormGroup){
        this._taxService.update(form)
        .subscribe(res => {
            this._applicationService.CloseModal('createOrEditTax')
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }




}
