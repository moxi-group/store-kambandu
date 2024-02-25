import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers/providers.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'providers', 
                component: ProvidersComponent,
                children: [
                    {
                        path: 'create-provider', 
                        component: ProvidersComponent
                    }
                ]
            },
            {
                path: 'orders', 
                component: OrdersComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class PurchasesRoutingModule {}
