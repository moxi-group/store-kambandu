import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { CustomersService } from '../customers.service';

@Component({
    selector: 'CreateOrEditCustomerModal',
    templateUrl: './create-or-edit-customer.component.html',
    styleUrls: ['./create-or-edit-customer.component.scss']
})

export class CreateOrEditCustomerComponent implements OnInit {
    @Input() modal: any = "CreateOrEditCustomerModal"
    @Input() title: string = "Registar Cliente"
    @Input() customer: any
    @Input() customerForm: FormGroup

    submitted = false
    customers: any = []

    constructor(
        private _customersService: CustomersService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.customerForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            phone_number: [null, Validators.required],
            email: [null, Validators.required],
            address: [null, Validators.required],
            nif: [null, Validators.required]
        })
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.customer !== undefined) {
            this.title = "Registar Cliente";
            this.customerForm.patchValue(this.customer);
        } else {
            this.title = "Atualizar Cliente";
        }
    }

    get f() {
        return this.customerForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.customerForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.customerForm.invalid) {
            return;
        }

        if ( Boolean(this.customerForm.getRawValue().uuid) ) {
            this._update(this.customerForm.getRawValue().uuid, this.customerForm.value)
        } else {
            this._create(this.customerForm.value)
        }
    }

    _create(form: FormGroup) {
        this._customersService.create(form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._customersService.update(uuid, form)
        .subscribe(res => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

}
