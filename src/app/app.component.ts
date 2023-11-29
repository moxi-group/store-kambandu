import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './views/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';




@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})

export class AppComponent {
	isLoggedIn: boolean = sessionStorage.getItem('sessionToken')? true : false

    constructor(
        public translate: TranslateService,
        private authService: AuthService,
        private router: Router
    ){

        /*
        if ( this.isLoggedIn ) {
            this.router.navigateByUrl('/dashboard/manager-roles')
		}else{
            this.router.navigateByUrl('/login')
        }
        */
        
        translate.addLangs([
            'pt-PT', 
            'en-EN'
        ])

        let locale = sessionStorage.getItem('locale')
        
        if (locale) {
            translate.setDefaultLang('en-EN')
            //translate.setDefaultLang(locale)
        } else {
            translate.setDefaultLang('pt-PT')
        }
    }

    ngOnInit() {
        /*
        this.authService.showLayoutEmitter.subscribe(
            myShow => this.isLoggedIn = myShow
        )
        */
        
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        })
    }


}
