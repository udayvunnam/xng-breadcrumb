import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.scss']
})
export class MentorListComponent implements OnInit {
  mentors: any[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getMentors().subscribe(response => {
      this.mentors = response;
    });
  }
}
