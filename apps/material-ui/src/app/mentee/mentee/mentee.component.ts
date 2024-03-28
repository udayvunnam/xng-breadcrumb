import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mentee',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './mentee.component.html',
  styles: ``,
})
export class MenteeComponent {}
