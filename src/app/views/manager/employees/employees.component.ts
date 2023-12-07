import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmployeesService } from './employees.service';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    employee: any = {}

    constructor(
        public _employeesService: EmployeesService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_stores();
    }

    get_stores() {
        this._employeesService
        .get_employees()
        .subscribe(response => {
            this._employeesService.employees = Object(response)
        })
    }

    pachValue(item: any) {
        this.employee = item
    }


}
