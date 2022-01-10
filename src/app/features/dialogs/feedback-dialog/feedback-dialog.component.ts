import { Platform } from '@angular/cdk/platform';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    public platform: Platform,
    private http: HttpClient
  ) { }

  feedbackForm = new feedbackForm(this.platform, navigator.userAgent, new Date());

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    if(this.feedbackForm.isValid()){

      // post the form
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(
        'https://formspree.io/f/xayvneor',
        this.feedbackForm,
        { 'headers': headers }
      ).subscribe(
        response => {
          console.log(response);
        }
      );

      // give user confirmation
      const snackBar = {
        message: "Thank you, your feedback has been submitted",
        action: "Ok",
        config: {duration: 3000}
      }
      this.snackBar.open(snackBar.message, snackBar.action, snackBar.config);

      // close dialog
      this.dialogRef.close();

    } else {
      // give user confirmation
      const snackBar = {
        message: "Invalid form, please try again",
        action: "Ok",
        config: {duration: 3000}
      }
      this.snackBar.open(snackBar.message, snackBar.action, snackBar.config);
    }
  }

}
