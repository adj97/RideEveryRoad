import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private ngxCookieService: NgxCookieService) { }

  write (cookie_name: string, cookie_value: string, cookie_expiry?: Date | number) {
    this.ngxCookieService.set(cookie_name,cookie_value, cookie_expiry);
  }

  check_exists (cookie_name: string) {
    return this.ngxCookieService.check(cookie_name);
  }

  read (cookie_name: string) {
    return this.ngxCookieService.get(cookie_name)
  }
}
