import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/views/auth/auth.service';

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})

export class AsideComponent implements OnInit {
    currentRole: boolean = sessionStorage.getItem('CURRENT_ROLE')? true : false
    currentUser: any
    
    ItensMenu: any = [
        {
            name: 'menu.invoices',
            link: '/managers/invoices',
            icon: 'ni ni-tablet-button'
        },
        {
            name: 'menu.receipts',
            link: '/managers/receipts',
            icon: 'ni ni-archive-2'
        },
        {
            name: 'menu.customers',
            link: '/managers/customers',
            icon: 'ni ni-single-02'
        },
        {
            name: 'menu.series',
            link: '/managers/series',
            icon: 'ni ni-app'
        },
        {
            name: 'menu.products',
            link: '/managers/products',
            icon: 'ni ni-ungroup'
        },
        {
            name: 'Lojas',
            link: '/managers/stores',
            icon: 'ni ni-shop'
        },
        {
            name: 'Fornecedores',
            link: '/managers/providers',
            icon: 'ni ni-single-02'
        },
        {
            name: 'menu.banks',
            link: '/managers/banks',
            icon: 'ni ni-building'
        }
    ]

    ItensMenuStaff: any = [
        {
            name: 'menu.subscriptions',
            link: '/configurations/subscriptions',
            icon: 'ni ni-tablet-button'
        },
        {
            name: 'menu.comapnies',
            link: '/configurations/companies',
            icon: 'ni ni-archive-2'
        },
        {
            name: 'menu.documents',
            link: '/configurations/documents',
            icon: 'ni ni-app'
        },
        {
            name: 'menu.taxes',
            link: '/configurations/taxes',
            icon: 'ni ni-single-02'
        },
        {
            name: 'menu.payment_methods',
            link: '/configurations/payment_methods',
            icon: 'ni ni-archive-2'
        },
        {
            name: 'menu.users',
            link: '/configurations/users',
            icon: 'ni ni-ui-04'
        }
    ]

    constructor(
        private router: Router,
        private _authService: AuthService,
        public translate: TranslateService
    ) {
        this.currentUser = this._authService.current_user()
    }

    ngOnInit(): void {
    }

    remove_role(){
        sessionStorage.removeItem('CURRENT_COMPANY')
        sessionStorage.removeItem('CURRENT_ROLE')
        this.router.navigate(['/dashboard/manager-roles'])
    }

}
