import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js/auto';
import { DashboardService } from './dashboard.service';
Chart.register(...registerables)

@Component({
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    currentRole: boolean = sessionStorage.getItem('CURRENT_ROLE')? true : false
    resume: any = {}

    constructor(
        private _dashService: DashboardService,
        private router: Router
    ){
        if (!this.currentRole) {
            this.router.navigateByUrl('/dashboard/manager-roles')
        }
        this.get_resume()
    }
    
    ngOnInit(): void {
        this.render_barchart()
        this.render_piechart()
    }

    get_resume(){
        this._dashService.get_resume()
        .subscribe(response => {
            this.resume = Object(response)
        },error => {
            console.log( error )
        })
    }

    render_barchart(){
        new Chart('barchart', {
            type: 'bar',
            data: {
                labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
                datasets: [{
                label: 'FATURAÇÃO / MÊS',
                data: [12, 19, 3, 5, 2, 3, 12, 2, 4, 12, 15, 20],
                borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    render_piechart(){
        new Chart('piechart', {
            type: 'bar',
            data: {
                labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
                datasets: [{
                    label: 'RECEBIMENTO / MÊS',
                    data: [2, 9, 13, 15, 19, 13, 2, 5, 4, 2, 5, 2],
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }




}
