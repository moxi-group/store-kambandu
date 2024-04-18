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

    get_receipts() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/receipts`, { headers: this.headers }
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




}
