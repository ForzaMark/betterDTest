import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccelerometerService {

  public accelerometer = require('nativescript-accelerometer');
  public accelerometerData: any;

  constructor() { }

  public startAccelerometer(){
    this.accelerometer.startAccelerometerUpdates((data: any) => {
      console.log('läuft');
      this.accelerometerData = data;
    })
  }

  public stopAccelerometer(){

  }
}
