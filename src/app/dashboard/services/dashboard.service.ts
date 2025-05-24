import { inject, Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DashboardCacheService } from './dashboard-cache.service';
import { STATIC_PROJECT } from '../lib/constants';
import type { TProject, TTrackedJob } from '../lib/types';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _trackedJobs = signal<TTrackedJob[]>([]);
  private _projects$ = new BehaviorSubject<TProject[]>([STATIC_PROJECT]);
  private _timers: Map<string, any> = new Map();

  private _cacheService = inject(DashboardCacheService);

  trackedJobs: Signal<TTrackedJob[]> = this._trackedJobs.asReadonly();

  get projects(): TProject[] {
    return this._projects$.getValue();
  }

  get projectTypes$(): Observable<TProject[]> {
    return this._projects$.asObservable();
  }

  setTrackedJobs(jobs: TTrackedJob[]): void {
    this._trackedJobs.set(jobs);
  }

  setProjects(projects: TProject[]): void {
    this._projects$.next(projects);
  }

  addTrackedJob(job: TTrackedJob): void {
    this._trackedJobs.update((jobs) => [...jobs, job]);

    if (job.isActive) {
      this._startTimer(job);
      this._updateCache();
    }
  }

  addProject(project: TProject): void {
    const currentProjects = this._projects$.getValue();

    this._projects$.next([...currentProjects, project]);
    this._updateCache();
  }

  removeTrackedJob(jobId: string): void {
    this.stopTimer(jobId);
    this._trackedJobs.update((jobs) => jobs.filter((job) => job.id !== jobId));
    this._updateCache();
  }
  
  removeProject(projectId: string): void {
    const currentProjects = this._projects$.getValue();

    this._projects$.next(currentProjects.filter(project => project.id !== projectId));
    this._updateCache();
  }
  
  stopTimer(jobId: string): void {
    const job = this._getTrackedJobById(jobId);
    const intervalId = this._timers.get(jobId);
    
    if (intervalId && job?.isActive) {
      job.isActive = false;
      job.endTime = new Date();
      clearInterval(intervalId);
      this._timers.delete(jobId);
      this._updateCache();
    }
  }

  resumeTimer(jobId: string): void {
    const job = this._getTrackedJobById(jobId);

    if (job && !job.isActive) {
      job.isActive = true;
      job.endTime = undefined;
      this._startTimer(job);
    }
  }

  updateTrackedJob(updatedJob: TTrackedJob): void {
    this._trackedJobs.update((jobs) =>
      jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    this._updateCache();
  }

  private _startTimer(job: TTrackedJob): void {
    // Parse the existing elapsedTime into seconds
    const [hours, minutes, seconds] = job.elapsedTime.split(':').map(Number);
    let currentTime = hours * 3600 + minutes * 60 + seconds;

    const intervalId = setInterval((): void => {
      currentTime++;

      // Format currentTime into hh:mm:ss
      const formattedHours = Math.floor(currentTime / 3600).toString().padStart(2, '0');
      const formattedMinutes = Math.floor((currentTime % 3600) / 60).toString().padStart(2, '0');
      const formattedSeconds = (currentTime % 60).toString().padStart(2, '0');

      job.elapsedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }, 1000);

    this._timers.set(job.id, intervalId);
  }

  private _getTrackedJobById(jobId: string): TTrackedJob | undefined {
    return this._trackedJobs().find((job) => job.id === jobId);
  }

  private _updateCache(): void {
    this._cacheService.saveToStorage({
      projects: this._projects$.getValue(),
      trackedJobs: this._trackedJobs(),
    });
  }
}
