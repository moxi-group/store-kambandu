import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PaymentMethodsService } from './payment-methods.service';

@Component({
    selector: 'app-payment-methods',
    templateUrl: './payment-methods.component.html',
    styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
    loading: any
    payment_method: any = {}
    payment_methods: any = []

    constructor(
        private _paymentMethodsService: PaymentMethodsService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_users();
    }

    get_users() {
      this.loading = true
        this._paymentMethodsService
        .get_payment_methods()
        .subscribe(response => {
            this.payment_methods = Object(response)
            this.loading = false

        })
    }

    pachValue(item: any) {
        this.payment_method = item
    }


}
