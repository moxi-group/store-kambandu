import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/views/manager/products/products.service';
import { DocumentsService } from '../../documents/documents.service';
import { ApplicationService } from 'src/app/api/application.service';
import { CompaniesService } from '../companies.service';

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
        private _companiesService: CompaniesService,
        private _applicationService: ApplicationService,
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

        this.templateForm.value.company_uuid = this.company.uuid
        this._create(this.templateForm.value)
    }

    _create(form: FormGroup) {
        this._companiesService.create_config_template(form)
        .subscribe(response => {
            this._applicationService.CloseModal('CreateOrEditTemplateModal')
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }


}
