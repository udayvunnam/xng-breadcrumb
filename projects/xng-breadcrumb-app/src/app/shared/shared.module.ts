import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, AppMaterialModule, FlexLayoutModule, HttpClientModule],
  exports: [CommonModule, AppMaterialModule, FlexLayoutModule, HttpClientModule]
})
export class SharedModule {}
