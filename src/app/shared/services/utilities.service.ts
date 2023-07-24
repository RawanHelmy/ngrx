import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}
  range(start: number, end: number): number[] {
    return [...Array(end - start).keys()].map((el) => el + start);
  }
}
