import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/views/auth/auth.service';

import MenuStaff from './menus/super_admin.json'
import MenuAdmin from './menus/admin.json'
import MenuManager from './menus/manager.json'
import MenuCollaborator from './menus/collaborator.json'

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss'],
})

export class AsideComponent implements OnInit {
    currentRole: boolean = sessionStorage.getItem('CURRENT_ROLE') ? true : false;
    role_is: any = sessionStorage.getItem('CURRENT_ROLE')
    currentUser: any;

    ItensMenu: any = [
    {
        isSub: true,
        id: 'customer',
        name: 'header.customer.title',
        link: '#',
        icon: 'ni ni-single-02',
        subMenu: [
        {
            name: 'menu.customers',
            link: '/managers/customers',
            icon: 'ni ni-single-02',
        },
        ],
    },
    {
        isSub: true,
        id: 'operations',
        name: 'header.operations.title',
        link: '#',
        icon: 'ni ni-ruler-pencil',
        subMenu: [
        {
            name: 'menu.series',
            link: '/managers/series',
            icon: 'ni ni-app',
        },
        {
            name: 'menu.products_and_sercives',
            link: '/managers/products',
            icon: 'ni ni-ungroup',
        },
        {
            name: 'Categorias',
            link: '/managers/categories',
            icon: 'ni ni-ungroup',
        },
        {
            name: 'Lojas',
            link: '/managers/stores',
            icon: 'ni ni-shop',
        },

        {
            name: 'Gestão Stock',
            link: '/managers/stocks',
            icon: 'ni ni-shop',
        },
        ],
    },

    {
        name: 'menu.invoices',
        link: '/managers/invoices',
        icon: 'ni ni-tablet-button',
    },
    {
        name: 'Caixas de venda',
        link: '/managers/caixas-vendas',
        icon: 'ni ni-tablet-button',
    },
    {
        name: 'menu.receipts',
        link: '/managers/receipts',
        icon: 'ni ni-archive-2',
    },
    {
        name: 'Fornecedores',
        link: '/managers/providers',
        icon: 'ni ni-single-02',
    },
    {
        name: 'menu.banks',
        link: '/managers/banks',
        icon: 'ni ni-building',
    },
    {
        name: 'Colaboradores',
        link: '/managers/employees',
        icon: 'ni ni-single-02',
    },
    ];

    ItensMenuStaff: any = []
    ItensMenuAdmin: any = []
    ItensMenuManager: any = []
    ItensMenuEmployee: any = []

    constructor(
        private router: Router,
        private _authService: AuthService,
        public translate: TranslateService,
        public route: Router
    ) {
        this.currentUser = this._authService.current_user();
    }

    ngOnInit(): void {

        if (this.role_is === 'super_admin') {
            this.ItensMenuStaff = MenuStaff.menu
        }

        if (this.role_is === 'admin') {
            this.ItensMenuAdmin = MenuAdmin.menu
        }

        if (this.role_is === 'manager') {
            this.ItensMenuManager = MenuManager.menu
        }

        if (this.role_is === 'employee') {
            this.ItensMenuEmployee = MenuCollaborator.menu
        }
    }

    remove_role() {
        sessionStorage.removeItem('CURRENT_COMPANY');
        sessionStorage.removeItem('CURRENT_ROLE');
        this.router.navigate(['/dashboard/manager-roles']);
    }
}
