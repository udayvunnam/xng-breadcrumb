import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    imports: [RouterOutlet, RouterLink, AsyncPipe]
})
export class BooksComponent implements OnInit {
  books$: Observable<{ url: string; numberOfPages: string; name: string }[]>;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.books$ = this.dataService.getBooks();
  }
}
