import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BanksService } from '../banks.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'CreateOrEditBankModal',
    templateUrl: './create-or-edit-bank.component.html',
    styleUrls: ['./create-or-edit-bank.component.scss']
})

export class CreateOrEditBankComponent implements OnInit {
    @Input() modal: any = "CreateOrEditBankModal"
    @Input() title: string = "Registar Banco"
    @Input() bank: any
    @Input() bankForm: FormGroup

    submitted = false

    constructor(
        private _banksService: BanksService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.bankForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            account_number: [null, Validators.required],
            iban: [null, Validators.required],
            description: [null, Validators.required]
        })
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.bank !== undefined) {
            this.title = "Registar banco";
            this.bankForm.patchValue(this.bank);
        } else {
            this.title = "Atualizar banco";
        }
    }

    get f() {
        return this.bankForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.bankForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.bankForm.invalid) {
            return;
        }

        if ( Boolean(this.bankForm.getRawValue().uuid) ) {
            this._update(this.bankForm.getRawValue().uuid, this.bankForm.value)
        } else {
            this._create(this.bankForm.value)
        }
    }

    _create(form: FormGroup) {
        this._banksService.create(form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._banksService.update(uuid, form)
        .subscribe(res => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }


}
