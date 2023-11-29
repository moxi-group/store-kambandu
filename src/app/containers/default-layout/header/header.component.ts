import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../../../views/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    currentUser: any

    constructor(
        private _authService: AuthService,
        public translate: TranslateService
    ) {
        this.currentUser = this._authService.current_user()
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

}
