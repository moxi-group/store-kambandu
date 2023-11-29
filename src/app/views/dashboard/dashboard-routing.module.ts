import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ManagerRolesComponent } from './manager-roles/manager-roles.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
        title: 'Dashboard'
        }
    },
    {
        path: 'manager-roles',
        component: ManagerRolesComponent,
        data: {
            title: 'Gestão de Acesso'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule {}
