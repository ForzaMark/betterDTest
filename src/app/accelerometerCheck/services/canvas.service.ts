import { Injectable } from '@angular/core';
import { CanvasPoint } from '../types/CanvasPoint.type';
import { CreateViewEventData } from 'tns-core-modules/ui/placeholder/placeholder';
import { AreaService } from './area.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  public canvasPoint: CanvasPoint;
  public canvas: globalAndroid.graphics.Canvas;
  public canvasHeight = 1000;
  public canvasWidth = 1000;

  constructor(private areaService: AreaService) { }

  public InitCanvas(args: CreateViewEventData): void {
    const nativeView = new android.widget.ImageView(args.context);
    nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
    const bitmap = android.graphics.Bitmap.createBitmap(this.canvasWidth, this.canvasHeight, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(bitmap);
    this.drawBorder();
    nativeView.setImageBitmap(bitmap);
    args.view = nativeView;
  }

  public drawCursor(): void {
    const blueColor = new android.graphics.Paint();
    blueColor.setARGB(255, 255, 0, 0);
    blueColor.setAntiAlias(true);
    if (this.canvas) {
      this.canvas.drawCircle(this.canvasPoint.x , this.canvasPoint.y, 5, blueColor );
    }
  }

  public drawBorder(): void {
    const blackColor = new android.graphics.Paint();
    blackColor.setStrokeWidth(10);
    blackColor.setARGB(255, 20, 210, 210);
    blackColor.setAntiAlias(true);
    this.canvas.drawLine( 0, 0, 0, this.canvasHeight, blackColor);
    this.canvas.drawLine( 0, 0, this.canvasWidth, 0, blackColor);
    this.canvas.drawLine( this.canvasWidth, 0, this.canvasWidth, this.canvasHeight, blackColor);
    this.canvas.drawLine( 0, this.canvasHeight, this.canvasWidth, this.canvasHeight, blackColor);
  }

  public drawArea(): void {
    const lightGrayColor = new android.graphics.Paint();
    lightGrayColor.setARGB(177, 220, 220, 220);
    lightGrayColor.setAntiAlias(true);
    this.canvas.drawCircle(this.areaService.areaX , this.areaService.areaY, this.areaService.areaRadius, lightGrayColor );
  }
}
