import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {  HttpClient,HttpClientModule } from '@angular/common/http';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'
import { ImageModel } from '../../model/project_get';
import { VoteService } from '../../services/api/vote.service';
import { PhotoService } from '../../services/api/photo.service';
@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [CommonModule,MatButtonModule,HttpClientModule,MatBottomSheetModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent implements OnInit{
  photoData: ImageModel[] = [];
  image: any[] = [];
  score: any[] = [];
  canClick: boolean = true;;
  image1: any;
  image2: any;
  score1: any = 0;
  score2: any = 0;

  constructor( private location : Location,private http:HttpClient,private voteService: VoteService,private photoService: PhotoService) {
  }
  ngOnInit(): void {
    this.loadDataAsync(); 
    this.canClick = true;
  }
  async loadDataAsync() { 

    this.image = await this.photoService.getPhoto();
    console.log(this.image);
    this.image1 = this.image[getRandomIndex(this.image)];
    do {
      this.image2 = this.image[getRandomIndex(this.image)];
    } while (this.image2 === this.image1);

      this.score = await this.voteService.getScore(this.image1.photoID);
      this.score1 = this.score[0].total_score;
      if(this.score1 == null){
        this.score1 = 0;
      }
      this.score = await this.voteService.getScore(this.image2.photoID);
      this.score2 = this.score[0].total_score;
      if(this.score2 == null){
        this.score2 = 0;
      }
    }
  
  goback(): void{
    this.location.back();
  }

  vote(WinPid: Number, LosePid: Number, check: Number): void {
    if (this.canClick) {
      const K = 32;
      const EA = 1 / (1 + 10 ** ((this.score2 - this.score1) / 400));
      const EB = 1 / (1 + 10 ** ((this.score1 - this.score2) / 400));      
  
      const url = `http://localhost:3000/vote`;
      console.log('คะแนนของภาพที่ 1: ', this.score1);
      console.log('คะแนนของภาพที่ 2: ', this.score2);

      if (check == 1) {
        //กรณี A ชนะ
        const RA = K * (1 - EA);
        console.log(RA);
        const RB = K * (0 - EB);
        console.log(RB);
        this.http
          .post(url + '/win', {
            photoID: WinPid,
            score: RA,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
        this.http
          .post(url + '/lose', {
            photoID: LosePid,
            score: RB,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
      } else if (check == 2) {
        //กรณี ฺB ชนะ
        const RA = K * (0 - EA);
        console.log(RA);
        const RB = K * (1 - EB);
        console.log(RB);
        this.http.post(url + '/win', {
          photoID: WinPid,
            score: RB,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
        this.http.post(url + '/lose', {
          photoID: LosePid,
            score: RA,
          })
          .subscribe((data: any) => {
            console.log(data);
          });
      }
  
      // Disable voting for 3 seconds
      this.canClick = false;
      setTimeout(() => {
        this.loadDataAsync(); 
        this.canClick = true;
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  }

}
function getRandomIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}