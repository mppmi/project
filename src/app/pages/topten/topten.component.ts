import { CommonModule,Location } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-topten',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './topten.component.html',
  styleUrl: './topten.component.scss'
})
export class ToptenComponent {
  constructor( private location : Location) {
  }
  goback(): void{
    this.location.back();
  }
}
