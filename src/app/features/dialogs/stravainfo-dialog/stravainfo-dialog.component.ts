import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
