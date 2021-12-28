import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from './features/dialogs/feedback-dialog/feedback-dialog.component';

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

  openFeedbackDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('App Component: The dialog was closed');
    });
  }

}
