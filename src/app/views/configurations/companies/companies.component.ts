import { Component, OnInit } from '@angular/core'
import { CompaniesService } from './companies.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})

export class CompaniesComponent implements OnInit {

    company: any = {}
    companies: any = []

    constructor(
        private companyService: CompaniesService,
        public translate: TranslateService
    ) {
        this.loading_data()
    }

    ngOnInit(): void {
    }

    loading_data() {
        this.get_companies()
    }

    get_companies() {
        this.companyService
        .get_companies()
        .subscribe(response => {
            this.companies = Object(response)
        })
    }

    pachValue(item: any) {
        this.company = item
    }

}
