import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProvidersService } from './providers.service';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.scss']
})

export class ProvidersComponent implements OnInit {
    loading: boolean = false
    provider: any = {}

    constructor(
        public _providerService: ProvidersService,
        public translate: TranslateService
    ) {

    }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_providers();
    }

    
    _print_report_invoice(){
        
    }

    get_providers() {
        this.loading = true
        this._providerService
        .get_providers()
        .subscribe(response => {
            this._providerService.providers = Object(response)
            this.loading = false
        })
    }

    pachValue(item: any) {
        this.provider = item
    }

}
