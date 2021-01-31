import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cashbox-registration',
  templateUrl: './cashbox-registration.component.html',
  styleUrls: ['./cashbox-registration.component.scss'],
})
export class CashboxRegistrationComponent implements OnInit {
  constructor(private router: Router) {
    // Uncomment following to reproduce problem
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {}
}
