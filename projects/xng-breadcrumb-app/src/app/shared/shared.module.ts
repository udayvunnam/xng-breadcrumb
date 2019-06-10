import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CodeBlockComponent } from './code-block/code-block.component';

@NgModule({
  declarations: [CodeBlockComponent],
  imports: [CommonModule, AppMaterialModule, FlexLayoutModule, HttpClientModule, ReactiveFormsModule],
  exports: [CommonModule, AppMaterialModule, FlexLayoutModule, HttpClientModule, ReactiveFormsModule, CodeBlockComponent]
})
export class SharedModule {}
