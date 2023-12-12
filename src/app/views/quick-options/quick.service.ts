import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuickService {
    banks: any = []

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')



    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    get_banks() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/banks`, { headers: this.headers }
        )
    }

    open_sale_box(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/stores/open-sales-box`,
            data, {headers: this.headers}
        )
    }






}
