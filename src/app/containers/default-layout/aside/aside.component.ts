import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/views/auth/auth.service';

import MenuStaff from './menus/super_admin.json';
import MenuAdmin from './menus/admin.json';
import MenuManager from './menus/manager.json';
import MenuCollaborator from './menus/collaborator.json';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  currentRole: boolean = sessionStorage.getItem('CURRENT_ROLE') ? true : false;
  role_is: any = sessionStorage.getItem('CURRENT_ROLE');

  currentUser: any;
  currentCompany: any
  
    ItensMenuStaff: any = []
    ItensMenuAdmin: any = []
    ItensMenuManager: any = []
    ItensMenuEmployee: any = []

    constructor(
        private _authService: AuthService,
        public translate: TranslateService,
        public route: Router
    ) {
      this.currentUser = this._authService.current_user();
      this.currentCompany = this._authService.current_company();
      
    }

  ngOnInit(): void {
    if (this.role_is === 'super_admin') {
      this.ItensMenuStaff = MenuStaff.menu;
    }

    if (this.role_is === 'admin') {
      this.ItensMenuAdmin = MenuAdmin.menu;
    }

    if (this.role_is === 'manager') {
      this.ItensMenuManager = MenuManager.menu;
    }

    if (this.role_is === 'employee') {
      this.ItensMenuEmployee = MenuCollaborator.menu;
    }
  }

}
