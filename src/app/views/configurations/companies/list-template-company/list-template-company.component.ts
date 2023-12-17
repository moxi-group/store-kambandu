import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ApplicationService } from 'src/app/api/application.service';
import { CompaniesService } from '../companies.service';

@Component({
    selector: 'ListTemplateCompanyModal',
    templateUrl: './list-template-company.component.html',
    styleUrls: ['./list-template-company.component.scss']
})
export class ListTemplateCompanyComponent implements OnInit {
    @Input() modal: any = "ListTemplateCompanyModal"

    loading: boolean = false
    templates: any = []
    @Input() template: any
    @Input() company: any

    
    constructor(
        private _companiesService: CompaniesService,
        private _applicationService: ApplicationService
    ) { }

    ngOnInit(): void {

    }

    ngOnChanges(){
        if ( Boolean(this.company.uuid ) ) {
            this.loading_init()
        }
    }

    loading_init(){
        /*
        this._companiesService
        .get_config_templates(this.template.uuid)
        .subscribe(response => {
            this.templates = Object(response)
        })
        */
    }

    pachValue(item: any) {
        this.company = item
    }

    _edit(template: any){

    }

}
