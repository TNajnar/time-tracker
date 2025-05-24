import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { hasRoleGuard } from '@lib/has-role.guard';
import { ERoles, ERoutes } from '@lib/enums';

export const routes: Routes = [
  { path: ERoutes.Auth, component: UnauthorizedComponent },
  { path: '', redirectTo: ERoutes.Dashboard, pathMatch: 'full' },
  {
    path: ERoutes.Dashboard,
    component: DashboardComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ERoles.Authorized],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
