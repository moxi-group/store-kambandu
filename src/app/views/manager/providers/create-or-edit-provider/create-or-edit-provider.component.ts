import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { ProvidersService } from '../providers.service';


@Component({
    selector: 'CreateOrEditProviderModal',
    templateUrl: './create-or-edit-provider.component.html',
    styleUrls: ['./create-or-edit-provider.component.scss']
})
export class CreateOrEditProviderComponent implements OnInit {
    @Input() modal: any = "CreateOrEditProviderModal"
    @Input() title: string = "Registar Fornecedor"
    @Input() provider: any
    @Input() providerForm: FormGroup

    submitted = false
    documents: any = []

    constructor(
        private _providerService: ProvidersService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.providerForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            email: [null, Validators.required],
            nif: [null, Validators.required],
            cell_phone: [null, Validators.required],
            address: [null, Validators.required]
        })
    }
    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.provider !== undefined) {
            this.title = "Registar Fornecedor";
            this.providerForm.patchValue(this.provider);
        } else {
            this.title = "Atualizar Fornecedor";
        }
    }

    get f() {
        return this.providerForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.providerForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.providerForm.invalid) {
            return;
        }

        if ( Boolean(this.providerForm.getRawValue().uuid) ) {
            this._update(this.providerForm.getRawValue().uuid, this.providerForm.value)
        } else {
            this._create(this.providerForm.value)
        }
    }

    _create(form: FormGroup) {
        this._providerService.create(form)
        .subscribe(response => {
            this._applicationService.CloseModal('CreateOrEditProviderModal')
            this.submitted = false;
            this.get_providers()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._providerService.update(uuid, form)
        .subscribe(res => {
            this._applicationService.CloseModal('CreateOrEditProviderModal')
            this.submitted = false;
            this.get_providers()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    get_providers() {
        this._providerService
        .get_providers()
        .subscribe(response => {
            this._providerService.providers = Object(response)
        })
    }

}
