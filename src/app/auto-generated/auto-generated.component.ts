import { Component, ViewChild, ElementRef } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { CanvasView, Paint, createRect, Canvas } from 'nativescript-canvas';
import { Color } from 'tns-core-modules/color/color';

@Component({
  selector: 'app-auto-generated',
  templateUrl: './auto-generated.component.html',
  styleUrls: ['./auto-generated.component.css']
})
export class AutoGeneratedComponent {

  constructor() {}

  public accelerometerData;
  public canvasEvent;
  public canvas;
  
  public startAccelerometer() {
    const accelerometer = require('nativescript-accelerometer');
    accelerometer.startAccelerometerUpdates((data) => {
      this.accelerometerData = data;
      this.draw();
    }, { sensorDelay: 'ui' });
  }

  public draw() {
    let blueColor = new android.graphics.Paint();
    blueColor.setARGB(255, 255, 0, 0);
    blueColor.setAntiAlias(true);
    this.canvas.drawCircle(this.accelerometerData.x * 750 + 500 , this.accelerometerData.y * -750 + 500, 10, blueColor );
  }

  createCanvasView(args) {
    let nativeView = new android.widget.ImageView(args.context);
    nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
    let bitmap = android.graphics.Bitmap.createBitmap(1000,1000, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(bitmap);
    let blueColor = new android.graphics.Paint();
    blueColor.setARGB(255, 255, 0, 0);
    blueColor.setAntiAlias(true);
    this.canvas.drawCircle(500, 500, 10, blueColor );
    nativeView.setImageBitmap(bitmap);
    args.view = nativeView;
    }
}
