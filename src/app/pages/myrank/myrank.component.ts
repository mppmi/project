import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-myrank',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './myrank.component.html',
  styleUrl: './myrank.component.scss'
})
export class MyrankComponent {
  constructor( private location : Location) {
  }
  goback(): void{
    this.location.back();
  }
}
