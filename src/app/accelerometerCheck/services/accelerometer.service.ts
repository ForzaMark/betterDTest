import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccelerometerService {

  public accelerometer = require('nativescript-accelerometer');
  public accelerometerData: any;
  public accelerometerDataSubject = new Subject<any>();

  constructor() { }

  public startAccelerometer() {
    this.accelerometer.startAccelerometerUpdates((data: any) => {
      this.accelerometerData = data;
      this.accelerometerDataSubject.next(1);
    });
  }

  public stopAccelerometer() {

  }

  public test() {
    console.log('test')
    this.accelerometerDataSubject.next(1);
  }
}
