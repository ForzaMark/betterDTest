import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  public areaX: number;
  public areaY: number;
  public areaRadius = 50;

  constructor() {}

  public createArea(canvasWidth: number, canvasHeight: number) {
      this.areaX = this.getRandomInt(canvasWidth);
      this.areaY = this.getRandomInt(canvasHeight);
  }

  private getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
  }
}
