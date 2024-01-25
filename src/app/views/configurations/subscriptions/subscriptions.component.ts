import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from './subscriptions.service';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'app-subscriptions',
    templateUrl: './subscriptions.component.html',
    styleUrls: ['./subscriptions.component.scss']
})

export class SubscriptionsComponent implements OnInit {
    subscription: any = {}
    subscriptions: any = []
    loading: boolean = false

    constructor(
        private subscriptionService: SubscriptionsService,
        public translate: TranslateService,
        private _applicationService: ApplicationService

    ) {
        this.loading_data()
    }

    ngOnInit(): void {
    }

    loading_data() {
        this.get_subscriptions()
    }

    get_subscriptions() {
        this.loading = true
        this.subscriptionService
        .get_subscriptions()
        .subscribe(response => {
            this.subscriptions = Object(response)
            this.loading = false

        })
    }

    pachValue(item: any) {
        this.subscription = item
    }

    _approve(item: any){
        let data = {
            uuid: item.uuid,
            status: 'approved'
        }

        this.subscriptionService
        ._approve(data)
        .subscribe(response => {
            this._applicationService.SwalSuccess("Registo Aprovado com sucesso!");
            this.get_subscriptions()
        })
    }

}
