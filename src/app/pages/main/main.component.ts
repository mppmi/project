import { Component } from '@angular/core';
import { RouterModule, RouterOutlet,RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [  RouterModule,
    RouterOutlet,
    RouterLink,MatIconModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
