import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { SaftService } from '../saft.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'GenerateSaftModal',
    templateUrl: './generate-saft.component.html',
    styleUrls: ['./generate-saft.component.scss']
})
export class GenerateSaftComponent implements OnInit {
    @Input() modal: any = "GenerateSaftModal"
    @Input() title: string = "Gerar Ficheio SAF-T"
    @Input() saft: any
    @Input() saftForm: FormGroup

    submitted = false

    constructor(
        private _saftService: SaftService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.saftForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            year: [null, Validators.required],
            start_month: [null, Validators.required],
            end_month: [null, Validators.required]
        })
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.saft !== undefined) {
            this.title = "Gerar Ficheio SAF-T";
            this.saftForm.patchValue(this.saft);
        }
    }

    get f() {
        return this.saftForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.saftForm.reset();
    }
    

    onSubmit() {
        this.submitted = true
        if (this.saftForm.invalid) {
            return;
        }

        if ( !Boolean(this.saftForm.getRawValue().uuid) ) {
            this._create(this.saftForm.value)
        }
    }

    _create(form: FormGroup) {
        this._saftService.create(form)
        .subscribe((response: Blob) => {
            saveAs(response, `saft-${new Date()}.xml`)

            this._applicationService.CloseModal('GenerateSaftModal')
            this.submitted = false;
            this.get_safts()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    get_safts() {
        this._saftService
        .get_safts()
        .subscribe(response => {
            this._saftService.safts = Object(response)
        })
    }

    get_years(){
        return [
            '2021',
            '2022',
            '2023',
            '2024'
        ]
    }

    get_months(){
        return [
            {
                name: 'Janeiro',
                value: 1
            },
            {
                name: 'Fevereiro',
                value: 2
            },            {
                name: 'Março',
                value: 3
            },            {
                name: 'Abril',
                value: 4
            },            {
                name: 'Maio',
                value: 5
            },            {
                name: 'Junho',
                value: 6
            },            {
                name: 'Julho',
                value: 7
            },            {
                name: 'Agosto',
                value: 8
            },            {
                name: 'Setembro',
                value: 9
            },            {
                name: 'Outubro',
                value: 10
            },            {
                name: 'Novembro',
                value: 11
            },            {
                name: 'Dezembro',
                value: 12
            }
        ]
    }
}
