import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'got-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  houses$: Observable<any[]>
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.houses$ = this.dataService.getHouses();
  }
}
