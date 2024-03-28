import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, AsyncPipe],
})
export class BookComponent implements OnInit {
  book$: Observable<{ characters: string[] }>;
  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.book$ = this.dataService.getBook(this.route.snapshot.paramMap.get('bookId'));
  }
}
