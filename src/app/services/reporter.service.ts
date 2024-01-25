import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ReporterService {

    constructor(
        private _http_client: HttpClient
    ) {
        
    }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')

    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)


    report_stock(data: any){
        let doc_uuid = '95d03196-acb3-4343-8c92-67f8a51013c9'
                
        return this._http_client.post(
            `${environment.invoiceServe.baseUrl}/${doc_uuid}/generate?output_format=xlsx`,
            data, { responseType: 'blob', }
        )
    }

    report_moviments_stocks(data: any){
        let doc_uuid = 'fec64b76-4707-4db5-ac31-8b1a0c3abbc2'
                
        return this._http_client.post(
            `${environment.invoiceServe.baseUrl}/${doc_uuid}/generate?output_format=xlsx`,
            data, { responseType: 'blob', }
        )
    }

}
