import { Component, OnInit } from '@angular/core';
import { CreateViewEventData } from 'tns-core-modules/ui/placeholder/placeholder';
import { CanvasService } from '../accelerometerCheck/services/canvas.service';
import { AccelerometerService } from '../accelerometerCheck/services/accelerometer.service';

@Component({
  selector: 'app-balance-test',
  templateUrl: './balance-test.component.html',
  styleUrls: ['./balance-test.component.css']
})
export class BalanceTestComponent implements OnInit {

  constructor(private canvasService: CanvasService,
              private accelerometerService: AccelerometerService) {
    this.accelerometerService.getData().subscribe(data => {
      if (data) {
        console.log('dat: '+ data.y)
        this.canvasService.canvasPoint = {
          x: data.x * 500,
          y: data.y * 500
        };
        this.canvasService.drawBalanceBoard();
        // this.checkCursorPosition();
        //saknnn
      }
    });
   }

  ngOnInit() {
  }
}
