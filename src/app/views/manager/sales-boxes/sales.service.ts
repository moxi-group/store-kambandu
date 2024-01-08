import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
    sales_boxes: any = []

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')



    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    get_seles_boxes(filter: any) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/stores/get-all-sales-box-by-store`, 
            { 
                params: filter,
                headers: this.headers 
            }
        )
    }

    close_box_sale(sales_box_uuid:string, data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/stores/close-sales-box/${sales_box_uuid}`,
            data,
            { headers: this.headers }
        )
    }



}
