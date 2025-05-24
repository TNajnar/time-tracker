import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ERoles, ERoutes } from '@lib/enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-unauthorized',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './unauthorized.component.html',
  host: {
    class: 'flex flex-col justify-center items-center h-dvh',
  },
})
export class UnauthorizedComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  protected _onSubmit(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    this._authService.loginUser(ERoles.Authorized);

    formData.reset();

    this._router.navigate([`/${ERoutes.Dashboard}`]);
  }
}
