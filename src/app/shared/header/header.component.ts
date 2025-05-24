import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from 'services/auth.service';
import { ERoutes } from '@lib/enums';

type THeaderItem = {
  id: number;
  routeName: string;
  url: ERoutes;
}

const headerItems: THeaderItem[] = [
  { id: 1, routeName: 'Dashboard', url: ERoutes.Dashboard },
];

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  protected _headerItems: THeaderItem[] = headerItems;

  protected _authService = inject(AuthService);
  private _router = inject(Router);

  onLogoClick(): void {
    this._router.navigate([`/${ERoutes.Dashboard}`]);
  }
}
