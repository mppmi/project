import { Component } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-owe',
  standalone: true,
  imports: [ CommonModule,MatButtonModule],
  templateUrl: './owe.component.html',
  styleUrl: './owe.component.scss'
})
export class OweComponent {
  constructor( private location : Location) {
  }
  goback(): void{
    this.location.back();
  }
}
