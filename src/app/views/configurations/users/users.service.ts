import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')

    public headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${this.token}`)

        get_users() {
            return this._http_client.get<any>(
            `${environment.fullBaseUrl}/staffs/users`, 
            { headers: this.headers }
        )
    }

}
