import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Constants {
  // public readonly API_ENDPOINT: string = 'https://cslab.it.msu.th/tripbooking/trip';
  public readonly API_ENDPOINT: string = 'http://locallhost:3000';
}