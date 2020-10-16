import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private API = `https://www.anapioficeandfire.com/api`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.API}/books`);
  }

  getBook(id: string): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.API}/books/${id}`);
  }

  getCharacters(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.API}/characters`);
  }

  getHouses(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.API}/houses`);
  }
}
