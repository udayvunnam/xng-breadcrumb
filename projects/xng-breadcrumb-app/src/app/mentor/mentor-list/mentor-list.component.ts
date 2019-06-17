import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/data.service';
import { Mentor } from '../../shared/models/mentor';
import { mentorList } from '../../shared/constants/code';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.scss']
})
export class MentorListComponent implements OnInit {
  code = mentorList;
  mentors: Mentor[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getMentors();
  }

  getMentors() {
    this.dataService.getMentors().subscribe(response => {
      this.mentors = response.sort((a, b) => {
        return new Date(b.updatedTs).getTime() - new Date(a.updatedTs).getTime();
      });
    });
  }
}
