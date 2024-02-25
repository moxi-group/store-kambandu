import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { NotFoundComponentComponent } from './views/layout/not-found-component/not-found-component.component';
import { QuickSaleComponent } from './views/quick-options/quick-sale/quick-sale.component';



export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '', component: DefaultLayoutComponent,
        data: { title: 'Início'},
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./views/dashboard/dashboard.module')
                .then(m => m.DashboardModule)
            },
            {
                path: 'configurations',
                loadChildren: () => import('./views/configurations/configurations.module')
                .then(m => m.ConfigurationsModule)
            },
            {
                path: 'managers',
                loadChildren: () => import('./views/manager/managers.module')
                .then(m => m.ManagersModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./views/reports/reports.module')
                .then(m => m.ReportsModule)
            },
            {
                path: 'purchases',
                loadChildren: () => import('./views/purchases/purchases.module')
                .then(m => m.PurchasesModule)
            },
            {
                path: 'quick-sale',
                component: QuickSaleComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
        component: NotFoundComponentComponent
    }
]







@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
