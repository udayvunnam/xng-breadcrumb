import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HousesComponent } from './houses/houses.component';
import { BooksComponent } from './books/books.component';

export const appRoutes: Routes = [
  {
    path: "books",
    component: BooksComponent,
  }, {
    path: "houses",
    component: HousesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ROUTER_COMPONENTS = [BooksComponent, HousesComponent];
