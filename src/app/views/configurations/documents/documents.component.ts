import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

    document: any = {}
    documents: any = []
    
    constructor(
        private _documentService: DocumentsService,
        public translate: TranslateService
    ) {

    }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_documents();
    }

    get_documents() {
        this._documentService
        .get_documents()
        .subscribe(response => {
            this.documents = Object(response)
        })
    }

    pachValue(item: any) {
        this.document = item
    }

}
