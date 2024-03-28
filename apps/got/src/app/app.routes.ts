import { Route } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { CharacterComponent } from './character/character.component';
import { HousesComponent } from './houses/houses.component';

export const appRoutes: Route[] = [
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'books/:bookId',
    component: BookComponent,
    children: [
      {
        path: 'characters/:id',
        component: CharacterComponent,
      },
    ],
  },
  {
    path: 'houses',
    component: HousesComponent,
  },
];
