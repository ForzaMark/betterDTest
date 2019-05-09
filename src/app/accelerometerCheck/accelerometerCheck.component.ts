import { Component, OnInit } from '@angular/core';
import { AccelerometerData } from './types/AcceleroMeterData.type';
import { CreateViewEventData } from 'tns-core-modules/ui/placeholder';
import { CanvasPoint } from './types/CanvasPoint.type';
import { AccelerometerService } from './services/accelerometer.service';

@Component({
  selector: 'app-accelerometerCheck',
  templateUrl: './accelerometerCheck.component.html',
  styleUrls: ['./accelerometerCheck.component.css']
})
export class accelerometerCheckComponent implements OnInit {

  public accelerometerData: AccelerometerData;
  private accelerometer = require('nativescript-accelerometer');
  public canvasPoint: CanvasPoint;
  public canvas: globalAndroid.graphics.Canvas;
  private canvasWidth: number;
  private canvasHeight: number;
  private areaX: number;
  private areaY: number;
  private areaRadius: number;
  private proovingState = false;
  private drunkCounter = 0;

  constructor(private readonly accelerometerService: AccelerometerService) { }

  ngOnInit() {
    this.canvasWidth = 1000;
    this.canvasHeight = 1000;
    this.areaRadius = 50;
    this.startAccelerometer(); // sollte permanent ausgeführt werden ... interval
  }

  public startAccelerometer(): void {
    this.accelerometer.startAccelerometerUpdates((data: AccelerometerData) => {
      this.accelerometerData = data;
      this.canvasPoint = {
        x: this.accelerometerData.x * 750 + (this.canvasWidth / 2),
        y: this.accelerometerData.y * -750 + (this.canvasHeight / 2)
      }; // hier canvaspoint auf accelerometerService.data setzen
      this.draw();
      if(this.proovingState && this.userInArea()) {
        this.drunkCounter = this.drunkCounter + 1;
      }
      if (this.drunkCounter >= 100) {
        alert('test finished');
        this.accelerometer.stopAccelerometerUpdates();
      }
    }, { sensorDelay: 'ui' });
  }

  public draw(): void {
    const blueColor = new android.graphics.Paint();
    blueColor.setARGB(255, 255, 0, 0);
    blueColor.setAntiAlias(true);
    this.canvas.drawCircle(this.canvasPoint.x , this.canvasPoint.y, 5, blueColor );
  }

  private drawBorder(): void {
    const blackColor = new android.graphics.Paint();
    blackColor.setStrokeWidth(10);
    blackColor.setARGB(255, 0, 0, 0);
    blackColor.setAntiAlias(true);
    this.canvas.drawLine( 0, 0, 0, this.canvasHeight, blackColor);
    this.canvas.drawLine( 0, 0, this.canvasWidth, 0, blackColor);
    this.canvas.drawLine( this.canvasWidth, 0, this.canvasWidth, this.canvasHeight, blackColor);
    this.canvas.drawLine( 0, this.canvasHeight, this.canvasWidth, this.canvasHeight, blackColor);
  }

  public InitCanvas(args: CreateViewEventData): void {
    const nativeView = new android.widget.ImageView(args.context);
    nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
    const bitmap = android.graphics.Bitmap.createBitmap(this.canvasWidth, this.canvasHeight, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(bitmap);
    this.drawBorder();
    nativeView.setImageBitmap(bitmap);
    args.view = nativeView;
  }

  public startProoving(): void {
    this.createArea();
    this.drawArea();
    this.proovingState = true;
    this.userInArea();
  }

  private createArea() {
    this.areaX = this.getRandomInt(this.canvasWidth);
    this.areaY = this.getRandomInt(this.canvasHeight);
  }

  private drawArea(): void {
    const lightGrayColor = new android.graphics.Paint();
    lightGrayColor.setARGB(177, 220, 220, 220);
    lightGrayColor.setAntiAlias(true);
    this.canvas.drawCircle(this.areaX , this.areaY, this.areaRadius, lightGrayColor );
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private userInArea(): boolean {
    return this.areaRadius >= Math.sqrt(((this.canvasPoint.x - this.areaX) * (this.canvasPoint.x - this.areaX))
                                      + ((this.canvasPoint.y - this.areaY) * (this.canvasPoint.y - this.areaY)));
  }
}
