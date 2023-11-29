import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

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

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/banks`,
            data, {headers: this.headers}
        )
    }

    update(uuid:string, data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/banks/${uuid}`,
            data,
            { headers: this.headers }
        )
    }




}
