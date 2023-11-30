import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoresService } from '../stores.service';
import { ApplicationService } from 'src/app/api/application.service';


@Component({
    selector: 'CreateOrEditStoreModal',
    templateUrl: './create-or-edit-store.component.html',
    styleUrls: ['./create-or-edit-store.component.scss']
})

export class CreateOrEditStoreComponent implements OnInit {
    @Input() modal: any = "CreateOrEditStoreModal"
    @Input() title: string = "Registar Loja"
    @Input() store: any
    @Input() storeForm: FormGroup

    submitted = false
    documents: any = []

    constructor(
        private _storeService: StoresService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.storeForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            start_number: [1, Validators.required],
            document_uuid: [null, Validators.required]
        })


    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.store !== undefined) {
            this.title = "Registar Loja";
            this.storeForm.patchValue(this.store);
        } else {
            this.title = "Atualizar Loja";
        }
    }

    get f() {
        return this.storeForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.storeForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.storeForm.invalid) {
            return;
        }

        if ( Boolean(this.storeForm.getRawValue().uuid) ) {
            this._update(this.storeForm.getRawValue().uuid, this.storeForm.value)
        } else {
            this._create(this.storeForm.value)
        }
    }

    _create(form: FormGroup) {
        this._storeService.create(form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._storeService.update(uuid, form)
        .subscribe(res => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }
}
