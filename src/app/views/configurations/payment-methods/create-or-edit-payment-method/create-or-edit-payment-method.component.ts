import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { PaymentMethodsService } from '../payment-methods.service';

@Component({
  selector: 'createOrEditPaymentMethod',
  templateUrl: './create-or-edit-payment-method.component.html',
  styleUrls: ['./create-or-edit-payment-method.component.scss']
})
export class CreateOrEditPaymentMethodComponent implements OnInit {
    @Input() modal: any = "createOrEditPaymentMethod"
    @Input() title: string = "Registar Forma de pagamento"
    @Input() payment_method: any

    submitted = false
    private loading = false

    @Input() paymentMethodForm: FormGroup;
    constructor(
        private _paymentMethodsService: PaymentMethodsService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder,
    ) {
        this.paymentMethodForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            description: [null, Validators.required],
            use_bank: [false, Validators.required]
        });
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.payment_method !== undefined) {
            this.title = "Registar Forma de pagamento";
            this.paymentMethodForm.patchValue(this.payment_method);
        } else {
            this.title = "Atualizar Forma de pagamento";
        }
    }

    get f() {
        return this.paymentMethodForm.controls
    }

    onReset() {
        this.submitted = false;
        this.paymentMethodForm.reset()
    }

    onSubmit() {
        this.submitted = true
        if (this.paymentMethodForm.invalid) {
            return;
        }
    
        this.loading = true

        if ( Boolean(this.paymentMethodForm.getRawValue().uuid) ) {
            this._update(this.paymentMethodForm.getRawValue().uuid, this.paymentMethodForm.value)
        } else {
            this._create(this.paymentMethodForm.value)
        }
    }

    _create(form: FormGroup) {
        this._paymentMethodsService.create(form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._paymentMethodsService.update(form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

}
