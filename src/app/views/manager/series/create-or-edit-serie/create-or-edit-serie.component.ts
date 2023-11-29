import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DocumentsService } from 'src/app/views/configurations/documents/documents.service';
import { SeriesService } from '../series.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'CreateOrEditSerieModal',
    templateUrl: './create-or-edit-serie.component.html',
    styleUrls: ['./create-or-edit-serie.component.scss']
})

export class CreateOrEditSerieComponent implements OnInit {
    @Input() modal: any = "CreateOrEditSerieModal"
    @Input() title: string = "Registar Serie"
    @Input() serie: any
    @Input() serieForm: FormGroup

    submitted = false
    documents: any = []

    constructor(
        private _serieService: SeriesService,
        private _documentService: DocumentsService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.serieForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            start_number: [1, Validators.required],
            document_uuid: [null, Validators.required]
        })

        this.get_documents()
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.serie !== undefined) {
            this.title = "Registar Serie";
            this.serieForm.patchValue(this.serie);
        } else {
            this.title = "Atualizar Serie";
        }
    }

    get f() {
        return this.serieForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.serieForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.serieForm.invalid) {
            return;
        }

        if ( Boolean(this.serieForm.getRawValue().uuid) ) {
            this._update(this.serieForm.getRawValue().uuid, this.serieForm.value)
        } else {
            this._create(this.serieForm.value)
        }
    }

    _create(form: FormGroup) {
        this._serieService.create(form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._serieService.update(uuid, form)
        .subscribe(res => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    get_documents() {
        this._documentService
        .get_documents({ filters: {} })
        .subscribe(response => {
            this.documents = Object(response)
        })
    }

}
