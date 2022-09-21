import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  get(item_name: string){
    return localStorage.getItem(item_name)
  }

  delete(item_name: string){
    return localStorage.removeItem(item_name)
  }

  write(item_name: string, item: string){
    return localStorage.setItem(item_name, item)
  }
}
