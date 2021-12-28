import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { feedbackForm } from 'src/app/shared/models/feedbackForm';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    public snackBar: MatSnackBar,
    public platform: Platform
  ) { }

  // feedbackForm = {summary: "", description: "", name: ""};
  feedbackForm = new feedbackForm(this.platform, navigator.userAgent, new Date());

  onCancelClick(): void {
    console.log("Dialog: I have just closed")
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    const snackBar = {
      message: "Thank you, your feedback has been submitted",
      action: "Ok",
      config: {duration: 2000}
    }
    this.snackBar.open(snackBar.message, snackBar.action, snackBar.config);
    console.log("Dialog: I have just submitted:");
    console.log(this.feedbackForm)
    this.dialogRef.close();
  }

}
