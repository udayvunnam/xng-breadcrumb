import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  imports: [AsyncPipe],
})
export class HousesComponent implements OnInit {
  houses$: Observable<{ name: string }[]>;
  private readonly dataService = inject(DataService);

  ngOnInit(): void {
    this.houses$ = this.dataService.getHouses();
  }
}
