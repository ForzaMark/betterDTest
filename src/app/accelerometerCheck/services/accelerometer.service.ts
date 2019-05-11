import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';

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
      console.log('acc')
      this.accelerometerData = data;
      this.sendData(data);
    });
  }

  public stopAccelerometer() {

  }

  sendData(data: any) {
      this.accelerometerDataSubject.next(data);
  }

  getData(): Observable<any> {
      return this.accelerometerDataSubject.asObservable();
  }
}
