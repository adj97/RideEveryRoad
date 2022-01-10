import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stravainfo-dialog',
  templateUrl: './stravainfo-dialog.component.html',
  styleUrls: ['./stravainfo-dialog.component.css']
})
export class StravaInfoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StravaInfoDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
