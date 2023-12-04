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

    create_stock_moviment(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/stocks`,
            data,{ headers: this.headers}
        )
    }

    get_stock_moviments(stock_uuid: string) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/stocks/find-stock-moviment-by-stock-uuid?stock_uuid=${stock_uuid}`, 
            { headers: this.headers }
        )
    }

    approve_moviment_stock(uuid: string) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/stocks/approve-stock-moviment?stock_moviment_uuid=${uuid}`,
            { headers: this.headers }
        )
    }

    reject_moviment_stock(uuid: string) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/stocks/reject-stock-moviment?stock_moviment_uuid=${uuid}`,
            { headers: this.headers }
        )
    }


}
