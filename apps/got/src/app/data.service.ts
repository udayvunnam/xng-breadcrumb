import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private API = `https://www.anapioficeandfire.com/api`;

  private readonly http = inject(HttpClient);

  getBooks(): Observable<{ url: string; numberOfPages: string; name: string }[]> {
    return this.http.get<{ url: string; numberOfPages: string; name: string }[]>(`${this.API}/books`);
  }

  getBook(id: string): Observable<{ characters: string[] }> {
    return this.http.get<{ characters: string[] }>(`${this.API}/books/${id}`);
  }

  getCharacters(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.API}/characters`);
  }

  getHouses(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(`${this.API}/houses`);
  }
}
