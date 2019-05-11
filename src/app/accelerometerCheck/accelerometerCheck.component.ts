import { Component } from '@angular/core';
import { AccelerometerService } from './services/accelerometer.service';
import { CanvasService } from './services/canvas.service';
import { AreaService } from './services/area.service';
import { ListPicker } from 'tns-core-modules/ui/list-picker';

@Component({
  selector: 'app-accelerometerCheck',
  templateUrl: './accelerometerCheck.component.html',
  styleUrls: ['./accelerometerCheck.component.css']
})
export class accelerometerCheckComponent {
  private proovingState = false;
  public enterState = false;
  private drunkCounter = 0;
  public drinks  = ['bier', 'pfeffi', 'radler'];
  public selectedListPickerIndex: string;

  constructor(private accelerometerService: AccelerometerService,
              private canvasService: CanvasService,
              private areaService: AreaService) {
    this.accelerometerService.getData().subscribe(data => {
      console.log(this.selectedListPickerIndex);
      this.canvasService.canvasPoint = {
          x: data.x * 750 + (this.canvasService.canvasWidth / 2),
          y: data.y * -750 + (this.canvasService.canvasHeight / 2)
      };
      this.canvasService.draw();
      this.testDataInArea();
    });
   }

  public newDrink() {
    this.enterState = true;
  }

  public enterDrink() {
    this.accelerometerService.startAccelerometer();
  }

  public drinkChanged(args: any) {
    console.log('dirnkChanged');
    const picker = <ListPicker>args.object;
    this.selectedListPickerIndex = this.drinks[picker.selectedIndex];
    //hshd
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
