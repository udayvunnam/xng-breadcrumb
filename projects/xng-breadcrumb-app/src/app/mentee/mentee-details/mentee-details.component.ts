import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { ActivatedRoute } from '@angular/router';
import { menteeDetails } from '../../shared/constants/code';

@Component({
  selector: 'app-mentee-details',
  templateUrl: './mentee-details.component.html',
  styleUrls: ['./mentee-details.component.scss']
})
export class MenteeDetailsComponent implements OnInit {
  code = menteeDetails;
  mentee: any;
  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getMentee();
  }

  getMentee() {
    const menteeId = this.route.snapshot.paramMap.get('id');

    this.dataService.getMentee(menteeId).subscribe(response => {
      this.mentee = response;
    });
  }
}
