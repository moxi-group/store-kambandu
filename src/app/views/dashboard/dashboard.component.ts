import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    currentRole: boolean = sessionStorage.getItem('CURRENT_ROLE')? true : false

    constructor(
        private router: Router
    ){
        if (!this.currentRole) {
            this.router.navigateByUrl('/dashboard/manager-roles')
        }
    }
    
    ngOnInit(): void {

    }






}
