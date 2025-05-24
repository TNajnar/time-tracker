import { Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Observable } from 'rxjs';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';

import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { STATIC_PROJECT } from '@app/dashboard/lib/constants';
import type { TProject } from '@app/dashboard/lib/types';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  imports: [NgClass, AsyncPipe, FormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatIconModule,
  ],
  styleUrls: ['./edit-project-dialog.component.css'],

})
export class EditProjectDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<EditProjectDialogComponent>);
  private _dashboardService = inject(DashboardService);

  projects$: Observable<TProject[]>;

  constructor() {
    this.projects$ = this._dashboardService.projectTypes$;
  }

  get staticProjects(): TProject {
    return STATIC_PROJECT;
  }

  onDeleteProject(projectId: string): void {
    this._dashboardService.removeProject(projectId);
  }

  onClose(): void {
    this.projects$.subscribe((projects) => {
      this._dialogRef.close(projects);
    });
  }
}
