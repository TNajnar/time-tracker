import { NgClass } from '@angular/common';
import { Component, HostListener, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { EditJobDialogComponent } from './edit-job-dialog/edit-job-dialog.component';
import type { TTrackedJob } from '@app/dashboard/lib/types';

@Component({
  selector: 'app-tracked-job-item',
  imports: [NgClass, DatePipe, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './tracked-job-item.component.html',
  host: {
    class: `
      grid grid-cols-4 md:grid-cols-[2fr,_2fr,_2fr,_2fr,_0.5fr,_0.5fr,_0.5fr] items-center gap-4
      p-4 w-full border border-gray rounded-md
    `,
  },
})
export class TrackedJobItemComponent {
  @Input({ required: true }) job!: TTrackedJob;

  private _dashboardService = inject(DashboardService);
  private readonly _dialog = inject(MatDialog);

  toggleJobStatus(): void {
    if (this.job.isActive) {
      this._dashboardService.stopTimer(this.job.id);
      return;
    }

    this._dashboardService.resumeTimer(this.job.id);
  }

  editJob(): void {
    const dialogRef = this._dialog.open(EditJobDialogComponent, {
      data: this.job,
    });

    dialogRef.afterClosed().subscribe((updatedJob: TTrackedJob) => {
      if (!updatedJob || !updatedJob.id) {
        return;
      }

      this._dashboardService.updateTrackedJob(updatedJob);
    });
  }

  deleteJob(): void {
    this._dashboardService.removeTrackedJob(this.job.id);
  }

  @HostListener('window:beforeunload')
  handleBeforeUnload(): void {
    this._dashboardService.stopTimer(this.job.id);
  }
}
