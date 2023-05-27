import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenubarComponent } from './components/menubar/menubar.component';

import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenubarComponent,
  ],
  imports: [CommonModule, BreadcrumbModule, RouterModule],
})
export class LayoutModule {}
