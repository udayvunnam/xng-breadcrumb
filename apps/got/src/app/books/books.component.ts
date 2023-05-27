import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books$: Observable<{ url: string; numberOfPages: string; name: string }[]>;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.books$ = this.dataService.getBooks();
  }
}
