import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMentors(): Observable<any> {
    return this.http.get<any>(`api/mentors/`);
  }

  addMentor(): Observable<any> {
    return this.http.get<any>(`api/mentors/`);
  }

  getMentees(): Observable<any> {
    return this.http.get<any>(`api/mentees/`);
  }

  addMentee(): Observable<any> {
    return this.http.get<any>(`api/mentees/`);
  }
}
