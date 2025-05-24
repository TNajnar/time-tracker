import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { DashboardService } from "@app/dashboard/services/dashboard.service";
import type { TProject, TTrackedJob } from "@app/dashboard/lib/types";

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: 'edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.css'],
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule
  ],
})
export class EditJobDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<EditJobDialogComponent>);
  private readonly _data = inject<TTrackedJob>(MAT_DIALOG_DATA);

  private _dashboardService = inject(DashboardService);

  projectType!: TProject['id'];
  description!: string;
  projects$: Observable<TProject[]>;
  
  constructor() {
    this.projects$ = this._dashboardService.projectTypes$;
    this.description = this._data.description;
    this.projects$.subscribe(projects => {
      if (this._data.projectType) {
        this.projectType = this._data.projectType.id;
        return
      }

      this.projectType = projects[0]?.id;
    });
  }

  onSubmit(): void {
    const project = this._getProject();

    const updatedJob: TTrackedJob = {
      ...this._data,
      description: this.description,
      projectType: project,
    };

    this._dialogRef.close(updatedJob);
  }

  onClose(): void {
    this._dialogRef.close();
  }

  private _getProject(): TProject | undefined {
    return this._dashboardService.projects.find(
      (project) => project.id === this.projectType
    );
  }
}

