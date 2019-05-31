import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Mentor } from '../../shared/models/mentor';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.scss']
})
export class MentorListComponent implements OnInit {
  mentors: Mentor[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getMentors();
  }

  getMentors() {
    this.dataService.getMentors().subscribe(response => {
      this.mentors = response;
    });
  }
}
