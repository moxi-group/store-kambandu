import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocTemplateService {

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')

    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    get_config_templates() {
        return this._http_client.get<any>(
        `${environment.fullBaseUrl}/companies/document-templater/${ this.companyToken }`, 
        { headers: this.headers }
    )}

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/companies/document-templater`,
            data,
            { headers: this.headers }
        )
    }

    update(uuid: string, data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/companies/document-templater/${uuid}`,
            data,
            { headers: this.headers }
        )
    }





}
