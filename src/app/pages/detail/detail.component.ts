import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MoviesService } from '../../services/api/movie.service'; 

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatButtonModule,     
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  idx: any;
  mv: any;
  type: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private moviesService: MoviesService 
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idx = params['mid'];
    });
    this.loadDataAsync();
  }

  async loadDataAsync() {
    this.mv = await this.moviesService.getID(this.idx); 
    console.log(this.mv);
  }

  goback(): void {
    this.location.back();
  }
}
