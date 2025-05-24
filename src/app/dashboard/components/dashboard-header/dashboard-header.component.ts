import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { generateId } from '@lib/utils';
import type { TProject, TTrackedJob } from '@app/dashboard/lib/types';

@Component({
  selector: 'app-dashboard-header',
  imports: [FormsModule, AsyncPipe,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
  host: {
    class: 'grid grid-cols-1 md:grid-cols-[1fr,_1fr,_0.1fr] gap-10 w-full',
  },
})
export class DashboardHeaderComponent {
  jobDescription: string = '';
  selectedProjectType: TProject['id'] = '';
  projectTypes$: Observable<TProject[]>;

  private _dashboardService = inject(DashboardService);
  private readonly _dialog = inject(MatDialog);

  constructor() {
    this.projectTypes$ = this._dashboardService.projectTypes$;
  }

  onEditProjects(): void {
    const dialogRef = this._dialog.open(EditProjectDialogComponent);

    dialogRef.afterClosed().subscribe((updatedJobs: TProject[]) => {
      this._dashboardService.setProjects(updatedJobs);
    });
  }

  addNewProject(): void {
    const dialogRef = this._dialog.open(AddProjectDialogComponent, {
      data: { newProject: this.selectedProjectType },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (!result || result.trim() === '') {
        return;
      }

      this._dashboardService.addProject({
        id: generateId(),
        name: result,
      });
    });
  }

  onStartClick(): void {
    if (this.jobDescription.trim() === '') {
      return;
    }

    const newJob: TTrackedJob = this._resolveNewJob();

    this._dashboardService.addTrackedJob(newJob);
    this.jobDescription = '';
    this.selectedProjectType = '';
  }

  private _resolveNewJob(): TTrackedJob {
    const selectedProject = this._dashboardService.projects.find(
      (project) => project.id === this.selectedProjectType
    );

    return {
      description: this.jobDescription,
      elapsedTime: "00:00:00",
      id: generateId(),
      isActive: true,
      projectType: selectedProject,
      startTime: new Date(),
    };
  }
}
