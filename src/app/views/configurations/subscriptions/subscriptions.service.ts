import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

    constructor(
        private _http_client: HttpClient
    ) {}

    private token = sessionStorage.getItem('sessionToken')
    
    params = new HttpParams()

    headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${this.token}`)

    get_subscriptions() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/subscriptions`, 
            { headers: this.headers }
        )
    }

    _approve(payload: any) {
        //this.params.set("status", payload.status)
        return this._http_client.put<any>(
            `${environment.fullBaseUrl}/subscriptions/validate`,
            payload,
            { headers: this.headers }
        )
    }

}
