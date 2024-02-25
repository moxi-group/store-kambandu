import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')



    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)


    reports_billigs(filter: any) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/reports/all-sales`, 
            {
                params: filter,
                headers: this.headers
            }
        )
    }

    intern_consumptions_billigs(filter: any) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/reports/intern-consumption`, 
            {
                params: filter,
                headers: this.headers
            }
        )
    }

    //====================================================================
    //====================================================================
    
    reports_products(filter: any) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/reports/get-all-sales-by-products`, 
            {
                params: filter,
                headers: this.headers
            }
        )
    }
    
    reports_payments_methods(filter: any) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/reports/payment-methods`, 
            {
                params: filter,
                headers: this.headers
            }
        )
    }

    reports_stores(filter: any) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/reports/sales-by-store`, 
            {
                params: filter,
                headers: this.headers
            }
        )
    }


}
