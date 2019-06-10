import { Component, OnInit } from '@angular/core';
import { dashboard } from '../../shared/constants/code';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  code = dashboard;

  constructor() {}

  ngOnInit() {}
}
