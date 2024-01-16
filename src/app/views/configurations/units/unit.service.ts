import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

    units: any = []

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

    get_units(filter: any = {}) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/units`,
            {
                params: filter,
                headers: this.headers
            }
        )
    }

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/units`,
            data, {headers: this.headers}
        )
    }

    update(uuid: string, data: any) {
        return this._http_client.put<any>(
            `${environment.fullBaseUrl}/units/${uuid}`,
            data,
            { headers: this.headers }
        )
    }




}
