import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    ScrollingModule
  ],
  declarations: []
})
export class AppMaterialModule {}
