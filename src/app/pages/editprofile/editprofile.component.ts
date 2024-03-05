
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatIconModule,MatInputModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss'
})
export class EditprofileComponent {
  constructor( private location : Location) {
  }
  goback(): void{
    this.location.back();
  }
}

