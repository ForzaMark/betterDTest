import { Component, OnInit } from '@angular/core';
import { CreateViewEventData } from 'tns-core-modules/ui/placeholder';
import { CanvasPoint } from './types/CanvasPoint.type';
import { AccelerometerService } from './services/accelerometer.service';

@Component({
  selector: 'app-accelerometerCheck',
  templateUrl: './accelerometerCheck.component.html',
  styleUrls: ['./accelerometerCheck.component.css']
})
export class accelerometerCheckComponent implements OnInit {

  public canvasPoint: CanvasPoint;
  public canvas: globalAndroid.graphics.Canvas;
  private areaX: number;
  private areaY: number;
  private proovingState = false;
  
  private canvasHeight = 1000;
  private canvasWidth = 1000;
  private areaRadius = 50;
  private drunkCounter = 0;

  constructor(private accelerometerService: AccelerometerService) {
    this.accelerometerService.getData().subscribe(data => {
      this.canvasPoint = {
          x: data.x * 750 + (this.canvasWidth / 2),
          y: data.y * -750 + (this.canvasHeight / 2)
      };
      this.draw();
      this.testDataInArea();
    });
   }

  ngOnInit() {
    this.accelerometerService.startAccelerometer();
  }

  private testDataInArea() {
    if (this.proovingState && this.userInArea()) {
      this.drunkCounter = this.drunkCounter + 1;
    }
    if (this.drunkCounter >= 100) {
      alert('test finished');
      this.accelerometerService.stopAccelerometer();
    }
  }

  public draw(): void {
    const blueColor = new android.graphics.Paint();
    blueColor.setARGB(255, 255, 0, 0);
    blueColor.setAntiAlias(true);
    if(this.canvas){
      this.canvas.drawCircle(this.canvasPoint.x , this.canvasPoint.y, 5, blueColor );
    }
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
