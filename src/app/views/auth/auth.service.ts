import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Router } from '@angular/router'
import { ApplicationService } from 'src/app/api/application.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    showLayoutEmitter = new EventEmitter<boolean>()
    private userLogged = false


    private token = sessionStorage.getItem('sessionToken')

    public headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${this.token}`)

    constructor(
        private router: Router,
        private _http_client: HttpClient,
        private _applicationService: ApplicationService
    ) { }

    signIn(user: any) {
        var formData = new FormData()

        formData.append("username", user.username)
        formData.append("password", user.password)

        this._http_client.post<any>(
            `${environment.fullBaseUrl}/users/login`,
            formData
        ).subscribe(
            response => {
                let result = response
                sessionStorage.setItem('sessionToken', result.access_token)

                let user = JSON.stringify(result.data)
                sessionStorage.setItem('currentUser', user)

                this.userLogged = true
                this.showLayoutEmitter.emit(true)
                this._applicationService.SwalSuccess('Sessão iniciada com sucesso')
                this.router.navigateByUrl('/dashboard/manager-roles')
            },
            (error) => {
                if (!error.ok) {
                    this.userLogged = false
                    this.showLayoutEmitter.emit(false)
                    this._applicationService.SwalDanger('Senha ou e-mail invalido')
                    this.router.navigate(['/'])
                }
            }
        )
    }

    _createSubscription(subscription: any){
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/subscriptions`,
            subscription
        )
    }


    current_user(): any {
        let data: any = sessionStorage.getItem('currentUser')
        let response = JSON.parse(data)
        return response
    }

    removeTokenOfUser() {
        sessionStorage.removeItem('currentUser')
        sessionStorage.removeItem('sessionToken')
        this.userLogged = false
        this.showLayoutEmitter.emit(false)
        this.router.navigateByUrl('/')
    }

    get_roles(){
        let url = `${environment.fullBaseUrl}/users/current_user`
        return this._http_client.get(url, { headers: this.headers })
    }

    getCompanyByUuid(company_uuid:any){
        let url = `${environment.fullBaseUrl}/companies/${company_uuid}`
        return this._http_client.get(url, { headers: this.headers })
    }

}