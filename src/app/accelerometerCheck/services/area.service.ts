import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  public areaX: number;
  public areaY: number;
  public areaRadius = 50;

  constructor(private canvasService: CanvasService) {}

  public createArea() {
      this.areaX = this.getRandomInt(this.canvasService.canvasWidth);
      this.areaY = this.getRandomInt(this.canvasService.canvasHeight);
  }

  private getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
  }
}
