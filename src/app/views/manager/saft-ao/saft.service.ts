import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SaftService {
    safts: any = []

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')



    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    get_safts() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/safts`, { headers: this.headers }
        )
    }

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/safts`,
            data,
            { 
                headers: this.headers
            }
        )
    }

    download(uuid:string) {
        let header = new HttpHeaders()
        .set('responseType', 'text')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${this.token}`)
        .set('header-company-uuid', `${this.companyToken}`)
        
        return this._http_client.get(
            `${environment.fullBaseUrl}/safts/download/${uuid}`, 
            {headers: header})


        /*
        let header = new HttpHeaders()
        .set('content-type', 'application/octet-stream')
        .set('Accept', 'application/octet-stream')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${this.token}`)
        .set('header-company-uuid', `${this.companyToken}`)



        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/safts/download/${uuid}`,
            { 
                headers: header
            }
        )

        */
    }




}
