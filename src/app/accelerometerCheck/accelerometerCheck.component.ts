import { Component, OnInit } from '@angular/core';
import { AccelerometerService } from './services/accelerometer.service';
import { CanvasService } from './services/canvas.service';
import { AreaService } from './services/area.service';

@Component({
  selector: 'app-accelerometerCheck',
  templateUrl: './accelerometerCheck.component.html',
  styleUrls: ['./accelerometerCheck.component.css']
})
export class accelerometerCheckComponent implements OnInit {
  private proovingState = false;
  private drunkCounter = 0;

  constructor(private accelerometerService: AccelerometerService,
              private canvasService: CanvasService,
              private areaService: AreaService) {
    this.accelerometerService.getData().subscribe(data => {
      this.canvasService.canvasPoint = {
          x: data.x * 750 + (this.canvasService.canvasWidth / 2),
          y: data.y * -750 + (this.canvasService.canvasHeight / 2)
      };
      this.canvasService.draw();
      this.testDataInArea();
    });
   }

  ngOnInit() {
    this.accelerometerService.startAccelerometer();
  }
  
  public startProoving(): void {
    this.areaService.createArea(this.canvasService.canvasWidth, this.canvasService.canvasHeight);
    this.canvasService.drawArea();
    this.proovingState = true;
    this.userInArea();
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

  private userInArea(): boolean {
    return this.areaService.areaRadius >= Math.sqrt(((this.canvasService.canvasPoint.x - this.areaService.areaX) * (this.canvasService.canvasPoint.x - this.areaService.areaX))
                                      + ((this.canvasService.canvasPoint.y - this.areaService.areaY) * (this.canvasService.canvasPoint.y - this.areaService.areaY)));
  }
}
