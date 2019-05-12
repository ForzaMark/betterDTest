import { Component } from '@angular/core';
import { AccelerometerService } from './services/accelerometer.service';
import { CanvasService } from './services/canvas.service';
import { AreaService } from './services/area.service';
import { ListPicker } from 'tns-core-modules/ui/list-picker';
import * as fs from "tns-core-modules/file-system";
import { Drink } from './types/drinkt.type';

@Component({
  selector: 'app-accelerometerCheck',
  templateUrl: './accelerometerCheck.component.html',
  styleUrls: ['./accelerometerCheck.component.css']
})
export class accelerometerCheckComponent {
  private proovingState = false;
  public enterState = false;
  private allCount = false;
  private drunkScore = 0;
  private drunkCounter = 0;
  public drinks  = [new Drink('Bier', 5, 500), new Drink('Likör', 18, 20),
                    new Drink('Likör', 18, 40), new Drink('Wodka', 40, 20),
                    new Drink('Wodka', 40, 20),  new Drink('Tequilla', 38, 20),
                    new Drink('Tequilla', 38, 40), new Drink('Jägermeister', 35, 20),
                    new Drink('Jägermeister', 45, 40), new Drink('Gin', 45, 20),
                    new Drink('Gin', 45, 40), new Drink('Sonstiges', 50, 20),
                    new Drink('Sonstiges', 50, 40), new Drink('Sonstiges härter', 60, 40)];
  public selectedListPickerIndex: string;

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

  public newDrink() {
    this.enterState = true;
  }

  public enterDrink() {
    this.accelerometerService.startAccelerometer();
  }

  public drinkChanged(args: any) {
    const picker = <ListPicker>args.object;
    this.selectedListPickerIndex = this.drinks[picker.selectedIndex].name;
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
    if(this.firstTimeInArea()) {
      this.drunkScore =  this.drunkScore + 1;
    }
    if (this.drunkCounter >= 100) {
      alert('test finished with ' + this.drunkScore);
      this.accelerometerService.stopAccelerometer();
      this.writeCorrectlyToFile();
    }
  }

  private userInArea(): boolean {
    return this.areaService.areaRadius >= Math.sqrt(((this.canvasService.canvasPoint.x - this.areaService.areaX) * (this.canvasService.canvasPoint.x - this.areaService.areaX))
                                      + ((this.canvasService.canvasPoint.y - this.areaService.areaY) * (this.canvasService.canvasPoint.y - this.areaService.areaY)));
  }

  private firstTimeInArea(): boolean {
    return this.drunkCounter >= 1;
  }

  private startAllPointCounter() {
    this.allCount = true;
  }

  public readFile() {
    const docFolder = fs.knownFolders.documents();
    const path = fs.path.join(docFolder.path, 'testText.txt');
    const myFile = fs.File.fromPath(path);

    myFile.readText().then(
      (res) => console.log(res)
    ).catch((err) => console.log(err));
  }

  public writeCorrectlyToFile() {
    const docFolder = fs.knownFolders.documents();
    const path = fs.path.join(docFolder.path, 'testText.txt');
    const myFile = fs.File.fromPath(path);

    myFile.readText().then(
      (res) => {
        const content = res + ' | ' + this.selectedListPickerIndex + ' with score : ' + this.drunkScore;
        myFile.writeText(content);
      }
    )
  }

  public clearFile() {
    const docFolder = fs.knownFolders.documents();
    const path = fs.path.join(docFolder.path, 'testText.txt');
    const myFile = fs.File.fromPath(path);

    myFile.writeText('');
  }
}
