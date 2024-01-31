import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../../../views/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    currentUser: any
    currentCompany: any

    constructor(
        private _authService: AuthService,
        public router: Router,
        public translate: TranslateService
    ) {
        this.currentUser = this._authService.current_user()
        this.currentCompany = this._authService.current_company();
    }

    ngOnInit(): void {

    }

    logOut(){
        this._authService.removeTokenOfUser()
    }

    public translateLanguageTo(locale: string) {
        sessionStorage.setItem('locale', locale)
        this.translate.use(locale)
    }

    remove_role() {
        sessionStorage.removeItem('CURRENT_COMPANY');
        sessionStorage.removeItem('CURRENT_ROLE');
        this.router.navigate(['/dashboard/manager-roles']);
      }

}
