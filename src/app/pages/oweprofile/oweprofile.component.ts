import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-oweprofile',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './oweprofile.component.html',
  styleUrl: './oweprofile.component.scss'
})
export class OweprofileComponent {
  constructor( private location : Location) {
  }
  goback(): void{
    this.location.back();
  }
}
