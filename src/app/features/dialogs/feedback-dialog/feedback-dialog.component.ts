import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    console.log("Dialog: I have just closed")
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.snackBar.open("Submitted", "Ok", {duration: 2000})
    console.log("Dialog: I have just submitted")
    this.dialogRef.close();
  }

}
