import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { ViewLibraryComponent } from './components/view-library/view-library.component';

@NgModule({
  declarations: [ViewLibraryComponent],
  imports: [CommonModule, LibraryRoutingModule],
})
export class LibraryModule {}
