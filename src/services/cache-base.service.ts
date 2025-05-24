import { Injectable } from '@angular/core';

interface ICacheService<T> {
  saveToStorage(data: T): void;
}

@Injectable({
  providedIn: 'root',
})
export abstract class CacheServiceBase<T> implements ICacheService<T> {
  protected storageKey!: string;

  constructor() {
    this._initializeCache();
  }

  protected abstract _initializeCache(): void;

  public abstract saveToStorage(data: T): void;

  public getStorageData(): T | null {
    const jsonData = localStorage.getItem(this.storageKey);

    if (jsonData) {
      return JSON.parse(jsonData) as T;
    }

    return null;
  }

  public clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}
