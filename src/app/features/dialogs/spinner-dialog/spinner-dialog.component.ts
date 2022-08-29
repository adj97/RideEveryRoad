import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['../../app.component.css']
})
export class SpinnerDialog{

  constructor(private dialogRef: MatDialogRef<DialogComponent>){
    dialogRef.disableClose = true;
  }

}
