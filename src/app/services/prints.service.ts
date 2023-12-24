import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PrintsService {
    constructor(
        private _http_client: HttpClient
    ) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')

    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    cash_summaries(data: any){
        let doc_uuid = 'a5d826a7-3f29-41c8-b9d5-08c52f45b7dc'
                
        return this._http_client.post(
            `${environment.invoiceServe.baseUrl}/${doc_uuid}/${environment.invoiceServe.output}`,
            data, { responseType: 'blob', }
        )
    }

    invoice(data: any) {
        let doc_uuid = this.get_documents(data.sigla_doc.substring(0,2))        
        return this._http_client.post(
            `${environment.invoiceServe.baseUrl}/${doc_uuid}/${environment.invoiceServe.output}`,
            data, { responseType: 'blob', }
        )
    }

    get_documents(slug: string): any {
        let data: any = sessionStorage.getItem('templates')
        let templates = JSON.parse(data)
    
        let template = templates.find((item: any) => item.document === slug)
        if ( Boolean(template.document_templater_uuid) ) {
            return template.document_templater_uuid
        }

        return null
    }
}
