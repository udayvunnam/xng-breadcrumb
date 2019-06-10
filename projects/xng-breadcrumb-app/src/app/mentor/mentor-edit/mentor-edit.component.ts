import { Component, OnInit } from '@angular/core';
import { mentorEdit } from '../../shared/constants/code';

@Component({
  selector: 'app-mentor-edit',
  templateUrl: './mentor-edit.component.html',
  styleUrls: ['./mentor-edit.component.scss']
})
export class MentorEditComponent implements OnInit {
  code = mentorEdit;
  constructor() {}

  ngOnInit() {}
}
