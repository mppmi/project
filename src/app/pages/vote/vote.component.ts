import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {  HttpClient,HttpClientModule } from '@angular/common/http';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'
import { ImageModel } from '../../model/project_get';
@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [CommonModule,MatButtonModule,HttpClientModule,MatBottomSheetModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent implements OnInit{
  photoData: ImageModel[] = [];
  canClick: boolean = true;
  photoid : any[] = [];
  constructor( private location : Location,private http:HttpClient) {
  }
  ngOnInit(): void {
  this.loadDataAsync(); 
  this.canClick = true;
  }
  async loadDataAsync() { 
    const url = `http://localhost:3000`;

    this.http.get(url+"/photo", {}).subscribe((data:any)=>{
      this.photoData = data;
      console.log(data);
      this.photoData.forEach(image => {
        if (image.eloRating === undefined) {
          image.eloRating = 1000;
        }
      });
      
      // Shuffle images after loading data
      this.photoData = this.shuffleArray(this.photoData);
});
    console.log('Call Name Completed');   
  }
  
  goback(): void{
    this.location.back();
  }
  vote(image: ImageModel): void {
    if (this.canClick) {
      // Set initial Elo rating to 1000 if it's not already set
      if (image.eloRating === undefined) {
        image.eloRating = 1000;
      }
  
      // Simulate Elo calculation
      const kFactor = 32; // Adjust as needed
      const expectedA = 1 / (1 + Math.pow(10, (image.eloRating - this.photoData[0].eloRating) / 400));
      const expectedB = 1 / (1 + Math.pow(10, (this.photoData[0].eloRating - image.eloRating) / 400));
  
      const actualScore = 1; // You might adjust this based on user input
  
      // Save the previous Elo ratings
      const previousEloRating1 = this.photoData[0].eloRating;
      const previousEloRating2 = this.photoData[1].eloRating;
  
      // Calculate new Elo ratings
      image.eloRating += kFactor * (actualScore - expectedA);
      this.photoData[0].eloRating += kFactor * ((1 - actualScore) - expectedB);
  
      // Sort images based on Elo rating
      this.photoData.sort((a, b) => b.eloRating - a.eloRating);
  
      // Log the scores of the first two images
      const url = `http://localhost:3000/vote`;
      console.log('คะแนนของภาพที่ 1: ', this.photoData[0].eloRating.toFixed(0));
      console.log('คะแนนของภาพที่ 2: ', this.photoData[1].eloRating.toFixed(0));
  
      // Check if the order has changed
      if (
        this.photoData[0].eloRating === previousEloRating2 &&
        this.photoData[1].eloRating === previousEloRating1
      ) {
        console.log('Order has changed!');
        // Here you can perform additional actions if the order has changed
      }
      const url2 = `http://localhost:3000/photo/`;
      this.http.put(url2 + this.photoid[0], {
        sumscore : this.photoData[0].eloRating.toFixed(0)
      }).subscribe((data:any)=>{
      console.log(data);
      });

      this.http.put(url2 + this.photoid[1], {
        sumscore : this.photoData[1].eloRating.toFixed(0)
      }).subscribe((data:any)=>{
      console.log(data);
      });
      console.log(this.photoid[0]);
      console.log(this.photoid[1]);
      
      // Shuffle images after voting
      this.photoData = this.shuffleArray(this.photoData);
  
      // Disable voting for 3 seconds
      this.canClick = false;
      setTimeout(() => {
        this.canClick = true;
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  }
  
private shuffleArray(array: any[]): any[] {
let currentIndex = array.length;
let temporaryValue;
let randomIndex;

// While there remain elements to shuffle...
while (currentIndex !== 0) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;

  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
  this.photoid[randomIndex] = array[randomIndex].photoID;
}
return array;
}
  

}
