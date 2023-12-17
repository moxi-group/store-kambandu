import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')

    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)

    get_documents() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/documents`, { headers: this.headers }
        )
    }

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/documents`,
            data,
            { headers: this.headers }
        )
    }

    update(data: any) {
        return this._http_client.post<any>(
        `${environment.fullBaseUrl}/auth/users`, { headers: this.headers }
        )
    }




}
