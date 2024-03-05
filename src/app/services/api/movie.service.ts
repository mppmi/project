import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constans';
import { ImageModel } from '../../model/project_get';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService  {

  apikey = "?apikey=6a24c82e";

  constructor(private constants : Constants,private http: HttpClient) {}

  public async getID(options?:any){ //เรียก trip 
    let url = '';
    if(options){//ถ้ามีการส่ง options
      const id = options;
      url = this.constants.API_ENDPOINT + this.apikey + '&i=' +id;
    }else{
      url = this.constants.API_ENDPOINT + this.apikey;
    }
    const response = await lastValueFrom(this.http.get(url));
    console.log(url);
    return response as ImageModel[];
  }
}
