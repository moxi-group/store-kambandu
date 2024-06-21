import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

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

    get_receipts(filter: any) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/receipts`, 
            {
                params: filter,
                headers: this.headers 
            }
        )
    }
    
    get_invoices_open( filter: any ) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/invoices/get-invoices-not-paid`, 
            {
                params: filter,
                headers: this.headers
            }
        )
    }

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/receipts`,
            data, {headers: this.headers}
        )
    }

    update(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/receipts`,
            data,
            { headers: this.headers }
        )
    }

    print(data: any) {
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
