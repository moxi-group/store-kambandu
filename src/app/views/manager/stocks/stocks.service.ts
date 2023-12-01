import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')



    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    get_stocks() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/stocks`, { headers: this.headers }
        )
    }

    create_moviment_stock(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/stocks`,
            data,
            { 
                headers: this.headers,
                // params: this.params 
            }
        )
    }

    approve_moviment_stock(uuid:string, data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/stocks/${uuid}`,
            data,
            { headers: this.headers }
        )
    }




}
