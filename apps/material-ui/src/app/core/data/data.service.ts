import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../types/member';

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

  getMentors(): Observable<Member[]> {
    return this.http.get<Member[]>(`api/mentors/`);
  }

  getMentor(id: string): Observable<Member> {
    return this.http.get<Member>(`api/mentors/${id}`);
  }

  addMentor(mentor: Member): Observable<Member> {
    this.mentorCount = this.mentorCount + 1;
    mentor.id = this.mentorCount;
    mentor.updatedTs = new Date();

    return this.http.post<Member>(`api/mentors/`, mentor, options);
  }

  updateMentor(mentor: Member): Observable<Member> {
    mentor.updatedTs = new Date();
    return this.http.put<Member>(`api/mentors/`, mentor, options);
  }

  getMentees(): Observable<Member[]> {
    return this.http.get<Member[]>(`api/mentees/`);
  }

  getMentee(id: string): Observable<Member> {
    return this.http.get<Member>(`api/mentees/${id}`);
  }

  addMentee(mentee: Member): Observable<Member> {
    this.menteeCount = this.menteeCount + 1;
    mentee.id = this.mentorCount;
    mentee.updatedTs = new Date();

    return this.http.post<Member>(`api/mentees/`, mentee, options);
  }

  updateMentee(mentee: Member): Observable<Member> {
    mentee.updatedTs = new Date();
    return this.http.put<Member>(`api/mentees/`, mentee, options);
  }
}
