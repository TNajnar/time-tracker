import { Injectable } from '@angular/core';

import { CacheServiceBase } from 'services/cache-base.service';
import type { TProject, TTrackedJob } from '../lib/types';

export type TDashboardCache = {
  projects: TProject[];
  trackedJobs: TTrackedJob[];
};

const INIT_STORAGE: TDashboardCache = Object.freeze({
  projects: [],
  trackedJobs: [],
});

@Injectable({
  providedIn: 'root',
})
export class DashboardCacheService extends CacheServiceBase<TDashboardCache> {
  private _dashboardCache!: TDashboardCache;

  constructor() {
    super();
  }

  protected override _initializeCache(): void {
    this.storageKey = 'dashboard';
    this._dashboardCache = INIT_STORAGE;
  }

  public override saveToStorage(data: TDashboardCache): void {
    this._dashboardCache = data;
    localStorage.setItem(this.storageKey, JSON.stringify(this._dashboardCache));
  }
}

