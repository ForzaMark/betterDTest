import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { AccelerometerData } from '../types/AcceleroMeterData.type';

@Injectable({
  providedIn: 'root'
})
export class AccelerometerService {

  public accelerometer = require('nativescript-accelerometer');
  public accelerometerData: AccelerometerData;
  public accelerometerDataSubject = new Subject<AccelerometerData>();
  public selectedDrink: string;

  constructor() { }

  public startAccelerometer(): void {
    this.accelerometer.startAccelerometerUpdates((data: AccelerometerData) => {
      this.accelerometerData = data;
      this.setData(data);
    },  { sensorDelay: 'game' });
  }

  public stopAccelerometer(): void {
    this.accelerometer.stopAccelerometerUpdates();
    this.accelerometerData = undefined;
  }

  setData(data: AccelerometerData): void {
      this.accelerometerDataSubject.next(data);
  }

  getData(): Observable<AccelerometerData> {
      return this.accelerometerDataSubject.asObservable();
  }
}
