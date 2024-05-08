import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor() { }

  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition((response)=>{
      const {latitude, longitude} = response.coords;
    })
  }
}
