import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers/providers.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateOrEditOrderComponent } from './orders/create-or-edit-order/create-or-edit-order.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'providers', 
                component: ProvidersComponent
            },
            {
                path: 'orders', 
                component: OrdersComponent
            },
            {
                path: 'create-order', 
                component: CreateOrEditOrderComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class PurchasesRoutingModule {}
