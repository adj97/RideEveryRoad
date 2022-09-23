import { Injectable } from '@angular/core';
import { AES, enc } from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  encryption_key: string;

  constructor() { 
    this.encryption_key = "E2XNdpaAVDaAHkrzjuar"
  }

  decrypt(encrypted_data: string){
    const bytes = AES.decrypt(encrypted_data, this.encryption_key);
    return bytes.toString(enc.Utf8)
  }

  encrypt(plaintext_input: string){
    const bytes = AES.encrypt(plaintext_input, this.encryption_key)
    return bytes.toString()
  }
}
