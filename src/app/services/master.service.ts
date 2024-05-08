import { Injectable } from '@angular/core';
import {ValueService} from './value.service'

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private valuesService:ValueService) { }

  getValue(){
    return this.valuesService.getValue();
  }
}
