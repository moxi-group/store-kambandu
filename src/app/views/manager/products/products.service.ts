import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

    get_products() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/products`, { headers: this.headers }
        )
    }

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/products`,
            data, {headers: this.headers}
        )
    }

    update(uuid: string, data: any) {
        return this._http_client.put<any>(
            `${environment.fullBaseUrl}/products/${uuid}`,
            data,
            { headers: this.headers }
        )
    }




}
