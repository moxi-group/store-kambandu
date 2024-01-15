import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmployeesService } from './employees.service';
import Swal  from 'sweetalert2'


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

    async _reset_password(collaborator: any){

        Swal.fire({
            title: "Tem certeza?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Sim",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await this._employeesService.reset_password( collaborator.uuid ).subscribe(
                    result => {}
                )
                Swal.fire("Senha redifinida com sucesso\nVálide à SMS no seu telefone!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }


}
