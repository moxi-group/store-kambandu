import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DocTemplateService } from './doc-templates.service';

@Component({
    selector: 'app-payment-methods',
    templateUrl: './doc-templates.component.html'
})
export class DocTemplatesComponent implements OnInit {
    loading: any
    template: any = {}
    templates: any = []

    constructor(
        private _docTemplateService: DocTemplateService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_templates();
    }

    get_templates() {
      this.loading = true
        this._docTemplateService
        .get_config_templates()
        .subscribe(response => {
            console.log(response);
            
            this.templates = Object(response)
            this.loading = false
        })
    }

    pachValue(item: any) {
        this.template = item
    }


}
