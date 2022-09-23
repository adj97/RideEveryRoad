import { Injectable } from '@angular/core';
import { CryptoService } from '../crypto-service/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(
    private cryptoService: CryptoService
  ) { }

  get(item_name: string){
    const raw_get = localStorage.getItem(item_name)
    if(raw_get){
      return this.cryptoService.decrypt(raw_get)
    } else {
      return raw_get
    }
  }

  delete(item_name: string){
    return localStorage.removeItem(item_name)
  }

  write(item_name: string, item: any){
    const encrypted_item = this.cryptoService.encrypt(JSON.stringify(item))
    return localStorage.setItem(item_name, encrypted_item)
  }
}
