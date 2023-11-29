import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')

    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)

    get_payment_methods() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/staffs/payment_methods`, { headers: this.headers }
        )
    }

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/staffs/payment_methods`,
            data,
            { headers: this.headers }
        )
    }

    update(data: any) {
        return this._http_client.post<any>(
        `${environment.fullBaseUrl}/payment_methods`, { headers: this.headers }
        )
    }




}
