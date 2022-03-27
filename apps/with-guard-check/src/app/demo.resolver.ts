import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DemoResolver implements Resolve<string> {
  resolve(): Promise<string> {
    return Promise.resolve('hero');
  }
}
