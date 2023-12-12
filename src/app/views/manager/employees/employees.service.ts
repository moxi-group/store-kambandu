import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
    employees: any = []

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')



    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    get_employees() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/collaborators`, { headers: this.headers }
        )
    }

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/collaborators`,
            data,
            { headers: this.headers }
        )
    }
    associate_employee_in_store(data: any){
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/stores/set-user-on-store`,
            data,
            { headers: this.headers }
        )
    }

    update(uuid:string, data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/collaborators/${uuid}`,
            data,
            { headers: this.headers }
        )
    }




}
