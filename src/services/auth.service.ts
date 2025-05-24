import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ROLE_KEY } from '@lib/constants';
import { ERoles, ERoutes } from '@lib/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userRole: ERoles = ERoles.Unauthorized;

  private _router: Router = inject(Router);

  get getUserRole(): ERoles {
    return this._userRole;
  }

  loginUser(role: ERoles): void {
    this._userRole = role;
    window.localStorage.setItem(ROLE_KEY, role);
  }

  logoutUser(): void {
    this._userRole = ERoles.Unauthorized;
    window.localStorage.removeItem(ROLE_KEY);
    this._router.navigate([`/${ERoutes.Auth}`]);
  }
}
