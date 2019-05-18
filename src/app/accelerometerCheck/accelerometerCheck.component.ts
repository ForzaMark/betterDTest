import { Component } from '@angular/core';
import { AccelerometerService } from './services/accelerometer.service';
import { CanvasService } from './services/canvas.service';
import { AreaService } from './services/area.service';
import * as fs from 'tns-core-modules/file-system';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accelerometer-check',
  templateUrl: './accelerometerCheck.component.html',
  styleUrls: ['./accelerometerCheck.component.css']
})
export class AccelerometerCheckComponent {
  private drunkScore = 0;
  private drunkCounter = 0;

  constructor(private accelerometerService: AccelerometerService,
              private canvasService: CanvasService,
              private areaService: AreaService,
              private router: Router) {
    this.accelerometerService.getData().subscribe(data => {
      if (data) {
        this.canvasService.canvasPoint = {
          x: data.x * 750 + (this.canvasService.canvasWidth / 2),
          y: data.y * -750 + (this.canvasService.canvasHeight / 2)
        };
        this.canvasService.drawCursor();
        this.checkCursorPosition();
      }
    });
  }

  public initProoving(): void {
    this.areaService.createArea(this.canvasService.canvasWidth, this.canvasService.canvasHeight, 50);
    this.canvasService.drawArea();
  }

  private checkCursorPosition(): void {
    if (this.isCursorInArea()) {
      this.drunkCounter = this.drunkCounter + 1;
    }
    if (!(this.firstTimeInArea())) {
      this.drunkScore =  this.drunkScore + 1;
    }
    if (this.drunkCounter >= 100) {
      this.endCursorPositionCheck();
    }
  }

  private isCursorInArea(): boolean {
    if (this.areaService.areaRadius) {
      return this.areaService.areaRadius >= this.calculatePointAreaDistance();
    }
    return false;
  }

  private firstTimeInArea(): boolean {
    return !(this.drunkCounter >= 1);
  }

  private endCursorPositionCheck() {
    this.drunkCounter = 0;
    this.accelerometerService.stopAccelerometer();
    this.writeScoreToFile();
    this.router.navigate(['/start-menu']);
  }

  public writeScoreToFile(): void {
    const docFolder = fs.knownFolders.documents();
    const path = fs.path.join(docFolder.path, 'testText.txt');
    const myFile = fs.File.fromPath(path);

    myFile.readText().then(
      (res) => {
        const content = res + ' | ' + this.accelerometerService.selectedDrink + ' with score : ' + this.drunkScore;
        this.drunkScore = 0;
        myFile.writeText(content);
      }
    );
  }

  private calculatePointAreaDistance(): number {
    return Math.sqrt(((this.canvasService.canvasPoint.x - this.areaService.areaX) *
                      (this.canvasService.canvasPoint.x - this.areaService.areaX))
                    + ((this.canvasService.canvasPoint.y - this.areaService.areaY) *
                      (this.canvasService.canvasPoint.y - this.areaService.areaY)));
  }
}
