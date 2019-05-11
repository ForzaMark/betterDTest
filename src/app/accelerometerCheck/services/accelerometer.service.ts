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

  constructor() { }

  public startAccelerometer() {
    this.accelerometer.startAccelerometerUpdates((data: AccelerometerData) => {
      this.accelerometerData = data;
      this.setData(data);
    });
  }

  public stopAccelerometer() {
    this.accelerometer.stopAccelerometerUpdates();
  }

  setData(data: AccelerometerData) {
      this.accelerometerDataSubject.next(data);
  }

  getData(): Observable<AccelerometerData> {
      return this.accelerometerDataSubject.asObservable();
  }
}