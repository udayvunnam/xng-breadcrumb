import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API = `https://www.anapioficeandfire.com/api`;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/books`);
  }

  getCharacters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/characters`);
  }

  getHouses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/houses`);
  }
}
