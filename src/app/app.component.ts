import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  // show routes bool
  nav = true;

  title = 'Ride Every Road';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    // const dialogRef = this.dialog.open(FeedbackDialog, {
    //   width: '250px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

}
