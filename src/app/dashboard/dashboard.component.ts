import { Component, inject, Signal } from '@angular/core';

import { DashboardService } from './services/dashboard.service';
import { DashboardCacheService, type TDashboardCache } from './services/dashboard-cache.service';
import { DashboardHeaderComponent } from "./components/dashboard-header/dashboard-header.component";
import { TrackedJobItemComponent } from "./components/tracked-job-item/tracked-job-item.component";
import type { TTrackedJob } from './lib/types';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHeaderComponent, TrackedJobItemComponent],
  templateUrl: './dashboard.component.html',
  host: {
    class: 'flex flex-col w-full'
  },
})
export class DashboardComponent {
  private _dashboardService = inject(DashboardService);
  private _cacheService = inject(DashboardCacheService);

  protected _trackedJobs: Signal<TTrackedJob[]> = this._dashboardService.trackedJobs;

  constructor() {
    const cachedDashboard: TDashboardCache | null = this._cacheService.getStorageData();

    if (cachedDashboard?.trackedJobs && cachedDashboard?.projects) {
      const { projects, trackedJobs } = cachedDashboard;

      this._dashboardService.setTrackedJobs(trackedJobs);
      this._dashboardService.setProjects(projects);
    }
  }
}
