import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  public areaX: number;
  public areaY: number;
  public areaRadius: number | undefined = undefined;

  constructor() {}

  public createArea(canvasWidth: number, canvasHeight: number, areaRadius: number): void {
      this.areaX = this.getRandomInt(canvasWidth);
      this.areaY = this.getRandomInt(canvasHeight);
      this.areaRadius = areaRadius;
      console.log('create');
  }

  private getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
  }
}
