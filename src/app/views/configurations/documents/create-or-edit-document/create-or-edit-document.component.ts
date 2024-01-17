import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
  selector: 'CreateOrEditDocumentModal',
  templateUrl: './create-or-edit-document.component.html',
  styleUrls: ['./create-or-edit-document.component.scss']
})
export class CreateOrEditDocumentComponent implements OnInit {
    @Input() modal: any = "CreateOrEditDocumentModal";
    @Input() title: string = "Registar Documento";
    @Input() document: any;

    submitted = false;
    private loading = false;

    @Input() documentForm: FormGroup;

    constructor(
        private _documentService: DocumentsService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder,

    ) {
        this.documentForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            slug: [null, Validators.required]
        });
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.document !== undefined) {
            this.title = "Registar Documento";
            this.documentForm.patchValue(this.document);
        } else {
            this.title = "Atualizar Documento";
        }
    }

    get f() {
        return this.documentForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.documentForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.documentForm.invalid) {
            return;
        }
    
        this.loading = true

        if ( Boolean(this.documentForm.getRawValue().uuid) ) {
            //this._update(this.documentForm.getRawValue().uuid, this.documentForm.value)
        } else {
            this._create(this.documentForm.value)
        }
    }

    _create(form: FormGroup) {

        this._documentService.create(form)
        .subscribe(response => {
            this._applicationService.CloseModal('CreateOrEditDocumentModal')
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(url: any, form: FormGroup){
        this._documentService.update(form)
        .subscribe(res => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }
}
