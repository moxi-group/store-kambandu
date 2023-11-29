import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-manager-roles',
    templateUrl: './manager-roles.component.html'
})
export class ManagerRolesComponent implements OnInit {

    currentUser: any
    isLoggedIn: boolean = sessionStorage.getItem('sessionToken')? true : false
    currentRole: boolean = sessionStorage.getItem('CURRENT_ROLE')? true : false
    roles: any = []

    constructor(
        private router: Router,
        private _authService: AuthService,
        public translate: TranslateService
    ) {
        this.currentUser = this._authService.current_user()

        if ( this.isLoggedIn ) {
            if (this.currentRole) {
                this.router.navigate(['/dashboard'])
            }else{
                this.get_roles()
                this.router.navigate(['/dashboard/manager-roles'])
            }
		}else{
            this.router.navigate(['/auth/login'])
        }


    }

    ngOnInit(): void {
        this._authService.showLayoutEmitter.subscribe(
            myShow => this.isLoggedIn = myShow
        )
    }

    get_roles(){
        this._authService.get_roles()
        .subscribe(response => {              
            let result = Object(response)
            this.roles = result.roles
        })
    }


    set_role(role: any){
        sessionStorage.setItem('CURRENT_COMPANY', role.company_uuid)
        
        this._authService.getCompanyByUuid(role.company_uuid)
        .subscribe(response => {
            let result = Object(response)            
            sessionStorage.setItem('CURRENT_COMPANY_DATA', JSON.stringify(result))
            sessionStorage.setItem('CURRENT_ROLE', role.role_type)
            this.router.navigateByUrl('/dashboard')
        })
    }

}
