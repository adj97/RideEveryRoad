import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService} from 'ngx-cookie-service';
import { CryptoService } from '../crypto-service/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(
    private ngxCookieService: NgxCookieService,
    private cryptoService: CryptoService
  ) { }

  write(cookie_name: string, cookie_value: string, cookie_expiry_days: number) {
    const encrypted_cookie_value = this.cryptoService.encrypt(cookie_value)
    this.ngxCookieService.set(cookie_name, encrypted_cookie_value, cookie_expiry_days);
  }

  check_exists(cookie_name: string) {
    return this.ngxCookieService.check(cookie_name);
  }

  read(cookie_name: string) {
    const raw_cookie = this.ngxCookieService.get(cookie_name)
    return this.cryptoService.decrypt(raw_cookie)
  }
}
