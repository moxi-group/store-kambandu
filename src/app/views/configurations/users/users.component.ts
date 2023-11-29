import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from './users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    submitted = false;
    public loading: boolean = false;

    public user: any = {}
    public users: any = [];

    constructor(
        private userService: UsersService,
        public translate: TranslateService
    ) {
        this.loading_data();
    }

    ngOnInit(): void { }

    loading_data() {
        this.get_users();
    }

    get_users() {
        this.userService
        .get_users()
        .subscribe(response => {
            this.users = Object(response)
        })
    }

    pachValue(item: any) {
        this.user = item
    }

    exportAsPDF() { }

    exportAsXLSX() { }

}
