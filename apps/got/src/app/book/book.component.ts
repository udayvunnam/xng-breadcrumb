import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  imports: [RouterLink, AsyncPipe],
})
export class BookComponent implements OnInit {
  book$: Observable<{ characters: string[] }>;
  private readonly dataService = inject(DataService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.book$ = this.dataService.getBook(this.route.snapshot.paramMap.get('bookId'));
  }
}
