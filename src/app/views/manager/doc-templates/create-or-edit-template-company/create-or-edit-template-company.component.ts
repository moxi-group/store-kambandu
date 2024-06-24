import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { DocumentsService } from 'src/app/views/configurations/documents/documents.service';
import { DocTemplateService } from '../doc-templates.service';

@Component({
    selector: 'CreateOrEditTemplateModal',
    templateUrl: './create-or-edit-template-company.component.html',
    styleUrls: ['./create-or-edit-template-company.component.scss']
})

export class CreateOrEditTemplateCompanyComponent implements OnInit {
    @Input() modal: any = "CreateOrEditTemplateModal"
    @Input() title: string = "Registar template PDF"
    @Input() template: any
    @Input() company: any
    @Input() templateForm: FormGroup

    submitted = false
    templates: any = []
    documents: any = []
    
    constructor(
        private _applicationService: ApplicationService,
        private _docTemplateService: DocTemplateService,
        private _documentsService: DocumentsService,
        private _formBuild: FormBuilder
    ) {
        this.templateForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            document_templater_uuid: [ null, Validators.required ],
            company_uuid: null,
            document_uuid: [null, Validators.required]
        })

        this.loading_init()
    }

    loading_init(){
        this._documentsService
        .get_documents()
        .subscribe(response => {
            this.documents = Object(response)
        })
    }


    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.template !== undefined) {
            this.title = "Registar template PDF";
            this.templateForm.patchValue(this.template);
        } else {
            this.title = "Atualizar template PDF";
        }
    }

    get f() {
        return this.templateForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.templateForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.templateForm.invalid) {
            return;
        }
        let companyToken = sessionStorage.getItem('CURRENT_COMPANY')
        this.templateForm.value.company_uuid = companyToken

        if ( Boolean(this.templateForm.getRawValue().uuid) ) {
            this._update(this.templateForm.getRawValue().uuid, this.templateForm.value)
        } else {
            this._create(this.templateForm.value)
        }

        console.log( this.templateForm.value );
        
    }

    _create(form: FormGroup) {
        this._docTemplateService.create(form)
        .subscribe(response => {
            this._applicationService.CloseModal('CreateOrEditTemplateModal')
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }


    _update(uuid: string, form: FormGroup){
        this._docTemplateService.update(uuid, form)
        .subscribe(response => {
            this._applicationService.CloseModal('CreateOrEditTemplateModal')
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

}
