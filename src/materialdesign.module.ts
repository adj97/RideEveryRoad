import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    exports: [
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatFormFieldModule
    ]
})

export class MaterialDesignModule {}