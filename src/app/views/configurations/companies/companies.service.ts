import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')

    public headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${this.token}`)

        get_companies() {
            return this._http_client.get<any>(
            `${environment.fullBaseUrl}/staffs/companies`, 
            { headers: this.headers }
        )
    }

}
