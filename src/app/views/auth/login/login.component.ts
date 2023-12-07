import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/api/application.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: any = {
        username: null,
        password: null
    }

    loading: boolean = false

    isLoggedIn: boolean = sessionStorage.getItem('sessionToken')? true : false
    currentRole: boolean = sessionStorage.getItem('CURRENT_ROLE')? true : false

    constructor(
        private _authService: AuthService,
        private _applicationService: ApplicationService,
        private router: Router
    ) {
        if ( this.isLoggedIn ) {
            if (this.currentRole) {
                this.router.navigate(['/dashboard'])
            }else(
                this.router.navigate(['/dashboard/manager-roles'])
            )
		}
    }

    ngOnInit(): void {
    }

    _signIn(){
        if (this.user.username == null) {
            this._applicationService.SwalDanger("O campo E-mail é obrigatório")
            return
        }

        if (this.user.password == null) {
            this._applicationService.SwalDanger("O campo Senha é obrigatório")
            return
        }

        this.loading = true

        this._authService.signIn(this.user)
        .subscribe(
            response => {
                let result = response
                sessionStorage.setItem('sessionToken', result.access_token)

                let user = JSON.stringify(result.data)
                sessionStorage.setItem('currentUser', user)

                this._authService.userLogged = true
                this._authService.showLayoutEmitter.emit(true)
                this._applicationService.SwalSuccess('Sessão iniciada com sucesso')
                this.router.navigateByUrl('/dashboard/manager-roles')
                this.loading = false
            },
            (error) => {
                if (!error.ok) {
                    this._authService.userLogged = false
                    this._authService.showLayoutEmitter.emit(false)
                    this._applicationService.SwalDanger('Senha ou e-mail invalido')
                    this.router.navigate(['/'])
                    this.loading = false
                }
            }
        )
    }
    

}
