import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mentor } from '../shared/models/mentor';
import { Mentee } from '../shared/models/mentee';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  mentorCount = 10;
  menteeCount = 10;

  constructor(private http: HttpClient) {}

  getMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(`api/mentors/`);
  }

  getMentor(id: string): Observable<Mentor> {
    return this.http.get<Mentor>(`api/mentors/${id}`);
  }

  addMentor(mentor: Mentor): Observable<Mentor> {
    this.mentorCount = this.mentorCount + 1;
    mentor.id = this.mentorCount;
    mentor.updatedTs = new Date();

    return this.http.post<Mentor>(`api/mentors/`, mentor, options);
  }

  updateMentor(mentor: Mentor): Observable<Mentor> {
    mentor.updatedTs = new Date();
    return this.http.put<Mentor>(`api/mentors/`, mentor, options);
  }

  getMentees(): Observable<Mentee[]> {
    return this.http.get<Mentee[]>(`api/mentees/`);
  }

  getMentee(id: string): Observable<Mentee> {
    return this.http.get<Mentee>(`api/mentees/${id}`);
  }

  addMentee(mentee: Mentee): Observable<Mentee> {
    this.menteeCount = this.menteeCount + 1;
    mentee.id = this.mentorCount;
    mentee.updatedTs = new Date();

    return this.http.post<Mentee>(`api/mentees/`, mentee, options);
  }

  updateMentee(mentee: Mentee): Observable<Mentee> {
    mentee.updatedTs = new Date();
    return this.http.put<Mentee>(`api/mentees/`, mentee, options);
  }
}
