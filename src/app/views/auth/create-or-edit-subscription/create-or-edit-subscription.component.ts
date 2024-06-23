import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApplicationService } from 'src/app/api/application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxesService } from '../../configurations/taxes/taxes.service';

@Component({
    selector: 'app-create-or-edit-subscription',
    templateUrl: './create-or-edit-subscription.component.html',
    styleUrls: ['./create-or-edit-subscription.component.scss']
})
export class CreateOrEditSubscriptionComponent implements OnInit {

    submitted = false
    subscription: any = {}
    regimes: any = []

    subscriptionForm: FormGroup;


    constructor(
        private _authService: AuthService,
        private _taxService: TaxesService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.subscriptionForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            user_name: [null, Validators.required],
            user_email: [null, Validators.required],
            user_phone_number: [null, Validators.required],
            user_password: [null, Validators.required],
            company_name: [null, Validators.required],
            company_nif: [null, Validators.required],
            company_street_name: [null, Validators.required],
            company_address_detail: [null, Validators.required],
            company_city: [null, Validators.required],
            company_email: [null, Validators.required],
            company_cell_phone: [null, Validators.required],
            regime_uuid: [null, Validators.required],
            
            company_regime: [null, Validators.required],
            company_postal_code: [null, Validators.required]
        })
    }

    ngOnInit(): void {

    }

    get f() {
        return this.subscriptionForm.controls;
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.subscription !== undefined) {
            this.subscriptionForm.patchValue(this.subscription);
        }
    }


    onReset() {
        this.submitted = false;
        this.subscriptionForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.subscriptionForm.invalid) {
            return;
        }
    
        this._create(this.subscriptionForm.value)
    }

    _create(form: FormGroup) {
        this._authService._createSubscription(form)
        .subscribe(response => {
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    get_regimes(){
        this._taxService
        .get_regimes()
        .subscribe( response => {
            this.regimes = response
        })
    }
}
