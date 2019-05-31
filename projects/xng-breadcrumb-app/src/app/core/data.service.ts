import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mentor } from '../shared/models/mentor';
import { Mentee } from '../shared/models/mentee';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(`api/mentors/`);
  }

  getMentor(id: string): Observable<Mentor> {
    return this.http.get<Mentor>(`api/mentors/${id}`);
  }

  addMentor(mentor: Mentor): Observable<Mentor> {
    return this.http.get<Mentor>(`api/mentors/`);
  }

  getMentees(): Observable<Mentee[]> {
    return this.http.get<Mentee[]>(`api/mentees/`);
  }

  getMentee(id: string): Observable<Mentee> {
    return this.http.get<Mentee>(`api/mentors/${id}`);
  }

  addMentee(mentee: Mentee): Observable<Mentee> {
    return this.http.get<Mentee>(`api/mentees/`);
  }
}
