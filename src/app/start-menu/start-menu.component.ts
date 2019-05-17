import { Component, OnInit } from '@angular/core';
import * as fs from 'tns-core-modules/file-system';
import { Router } from '@angular/router';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';

registerElement('CardView', () => CardView);


@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css']
})
export class StartMenuComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  public newDrink(): void {
    this.router.navigate(['/drink-selector']);
  }

  public readFile(): void {
    const docFolder = fs.knownFolders.documents();
    const path = fs.path.join(docFolder.path, 'testText.txt');
    const myFile = fs.File.fromPath(path);

    myFile.readText().then(
      (res) => alert(res)
    ).catch((err) => console.log(err));
  }

  public clearFile(): void {
    const docFolder = fs.knownFolders.documents();
    const path = fs.path.join(docFolder.path, 'testText.txt');
    const myFile = fs.File.fromPath(path);

    myFile.writeText('');
  }

}
