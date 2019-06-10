import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { ActivatedRoute } from '@angular/router';
import { mentorDetails } from '../../shared/constants/code';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss']
})
export class MentorDetailsComponent implements OnInit {
  code = mentorDetails;
  mentor: any;
  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getMentor();
  }

  getMentor() {
    const mentorId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentor(mentorId).subscribe(response => {
      this.mentor = response;
    });
  }
}
