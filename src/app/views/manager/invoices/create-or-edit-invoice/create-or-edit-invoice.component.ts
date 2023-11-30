import { Component, OnInit, SimpleChange } from '@angular/core';
import { of } from 'rxjs'
import { Router } from '@angular/router';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { InvoicesService } from '../invoices.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'create-invoice',
    templateUrl: './create-or-edit-invoice.component.html',
    styleUrls: ['./create-or-edit-invoice.component.scss']
})

export class CreateOrEditInvoiceComponent implements OnInit {
    stepStates = {
        normal: STEP_STATE.normal,
        disabled: STEP_STATE.disabled,
        error: STEP_STATE.error,
        hidden: STEP_STATE.hidden
    };

    config: NgWizardConfig = {
        selected: 0,
        theme: THEME.arrows,
        toolbarSettings: {
            toolbarExtraButtons: [
                {
                    text: 'Facturar', 
                    class: 'btn btn-success btn-sm', 
                    event: () => {
                        this.submitted()
                    }
                }
            ]
        }
    };

    active_payment_line = false
    series: any = []
    products: any = []
    product: any = {}
    customers: any = []
    payment_methods: any = []
    isValid: boolean = false;


    constructor(
        private router: Router,
        private ngWizardService: NgWizardService,
        public _invoicesService: InvoicesService,
        private _applicationService: ApplicationService
    ) {


    }

    ngOnInit(): void {
    }

    submitted(){
        let is_valid_form = this._validations()

        if ( is_valid_form ) {
            this._create()
        }

    }

    _create() {
        this._invoicesService.create(this._invoicesService.invoiceObject)
        .subscribe(response => {
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.router.navigate(['/managers/invoices'])
        })
    }

    _validations(){
        //================ validar cliente
        if ( !this._invoicesService.invoiceObject.customer_uuid ) {
            this._applicationService.SwalDanger("Por favor selecionar cliente");
            return false
        }

        //================ validar serie
        if ( !this._invoicesService.invoiceObject.serie_uuid ) {
            this._applicationService.SwalDanger("Por favor selecionar Série");
            return false
        }

        //================ validar linhas
        if ( !this._invoicesService.invoiceObject.lines.length ) {
            this._applicationService.SwalDanger("Por favor adicionar linhas na fatura");
            return false
        }

        //================ validar linhas === FR
        if ( this._invoicesService.invoiceObject.serie_uuid && this._invoicesService.serie.document.slug === 'FR' ) {
            if ( !this._invoicesService.invoiceObject.payment_lines.length ) {
                this._applicationService.SwalDanger("Por favor Pagar a Fatura-Recibo");
                return false
            } else {
                if ( this._invoicesService.total_received <  this._invoicesService.total ) {
                    this._applicationService.SwalDanger(`Por favor o valor deve ser superior ou igual à ${this._invoicesService.total.toFixed()}`);
                    return false 
                }
            }
        }

        return true
    }

    enableAnchor: NgWizardConfig = {
        theme: THEME.arrows,
        toolbarSettings: { showNextButton: false, showPreviousButton: false },
        anchorSettings: { enableAllAnchors: true, markDoneStep: true },
    };

    /*

    showPreviousStep(event?: Event) {
        this.ngWizardService.previous();
    }

    showNextStep(event?: Event) {
        this.ngWizardService.next();
    }

    resetWizard(event?: Event) {
        this.ngWizardService.reset();
    }

    setTheme(theme: THEME) {
        this.ngWizardService.theme(theme);
    }
    */



    stepChanged(args: StepChangedArgs) {
        //console.log( this._invoicesService.invoiceObject )
        
    }

    exitStepOne(){
        if (this._invoicesService.invoiceObject.customer_uuid && 
            this._invoicesService.invoiceObject.serie_uuid) {
            return true
        }
        return false
    }

    isValidFunctionReturnsBoolean(args: StepValidationArgs) {
        return true
    }



}
