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

    labels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']


    constructor(
        private _dashService: DashboardService,
        private router: Router
    ){
        if (!this.currentRole) {
            this.router.navigateByUrl('/dashboard/manager-roles')
        }
    }
    
    ngOnInit(): void {
        this.get_resume()
    }

    get_resume(){
        this._dashService.get_resume()
        .subscribe(response => {
            let result = Object(response)
            this.resume = result
            this.render_barchart(result)
            this.render_piechart(result)
        },error => {
            console.log( error )
        })
    }

    render_barchart(response: any){
        let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let bill_by_month = response.bill_by_month

        for(let item of bill_by_month){
            if (this.labels.includes( item.month_name)) {
                const position = this.labels.findIndex(label => label === item.month_name)
                data[position] = item.total
            }
        }

        new Chart('barchart', {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [{
                label: 'FATURAÇÃO / MÊS',
                data: data,
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

    render_piechart(response: any){
        let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let receipt_by_month = response.receipt_by_month

        for(let item of receipt_by_month){
            if (this.labels.includes( item.month_name)) {
                const position = this.labels.findIndex(label => label === item.month_name)
                data[position] = item.total
            }
        }

        new Chart('piechart', {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'RECEBIMENTO / MÊS',
                    data: data,
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
