import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  constructor() {}
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }
  get(key: string): unknown {
    try {
      let item = localStorage.getItem(key);
      let tempItem: string = '';
      if (item) {
        tempItem = item;
        return JSON.parse(tempItem);
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
