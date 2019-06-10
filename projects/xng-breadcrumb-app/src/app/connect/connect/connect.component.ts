import { Component, OnInit } from '@angular/core';
import { connect } from '../../shared/constants/code';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  code = connect;

  constructor() {}

  ngOnInit() {}
}
