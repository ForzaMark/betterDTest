import { Component, OnInit } from '@angular/core';
import { ListPicker } from 'tns-core-modules/ui/list-picker/list-picker';
import { Drink } from '../accelerometerCheck/types/drinkt.type';
import { AccelerometerService } from '../accelerometerCheck/services/accelerometer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drink-selector',
  templateUrl: './drink-selector.component.html',
  styleUrls: ['./drink-selector.component.css']
})
export class DrinkSelectorComponent implements OnInit {

  public drinks  = [new Drink('Bier', 5, 500), new Drink('Likör', 18, 20),
                    new Drink('Likör', 18, 40), new Drink('Wodka', 40, 20),
                    new Drink('Wodka', 40, 20),  new Drink('Tequilla', 38, 20),
                    new Drink('Tequilla', 38, 40), new Drink('Jägermeister', 35, 20),
                    new Drink('Jägermeister', 45, 40), new Drink('Gin', 45, 20),
                    new Drink('Gin', 45, 40), new Drink('Sonstiges', 50, 20),
                    new Drink('Sonstiges', 50, 40), new Drink('Sonstiges härter', 60, 40)];
  public selectedListPickerIndex: string;

  constructor(public accelerometerService: AccelerometerService,
              public router: Router) { }

  ngOnInit() {
  }

  public enterDrink(): void {
    this.accelerometerService.selectedDrink = this.selectedListPickerIndex;
    this.accelerometerService.startAccelerometer();
    this.router.navigate(['/accelerometer-check']);
  }

  public drinkChanged(args: any): void {
    const picker: ListPicker = args.object;
    this.selectedListPickerIndex = this.drinks[picker.selectedIndex].name;
  }

}
