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
        this._authService.signIn(this.user)
    }
    

}
