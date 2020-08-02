import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageNotFoundComponent, NavbarComponent],
  imports: [SharedModule, RouterModule.forChild([])],
  exports: [PageNotFoundComponent, NavbarComponent],
})
export class CoreModule {}
