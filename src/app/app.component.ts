import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  // show routes bool
  nav = true;

  title = 'Ride Every Road';

  ngOnInit(): void {
  }

}
