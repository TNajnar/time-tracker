import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'services/auth.service';

import { HeaderComponent } from "./shared/header/header.component";
import { ROLE_KEY } from '@lib/constants';
import { ERoles, ERoutes } from '@lib/enums';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  constructor() {
    const isAuthRoleStored = window.localStorage.getItem(ROLE_KEY);

    if (isAuthRoleStored) {
      const transformedRole: ERoles = isAuthRoleStored as ERoles;
      this._authService.loginUser(transformedRole);

      return;
    };

    this._router.navigate([`/${ERoutes.Auth}`]);
  }

  get isAuthorized(): boolean {
    return this._authService.getUserRole === ERoles.Authorized;
  }
}
