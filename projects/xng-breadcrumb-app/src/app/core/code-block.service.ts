import { ElementRef, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as Prism from 'prismjs';
import * as _ from 'lodash';

import 'clipboard';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';

@Injectable({
  providedIn: 'root'
})
export class CodeBlockService {
  constructor(private sanitizer: DomSanitizer) {}

  public highlight(el: ElementRef, code: string, language: string): void {
    if (el instanceof ElementRef && code) {
      el.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.escapeHtml(code));
      Prism.highlightElement(el.nativeElement);
    }
  }

  private escapeHtml(unsafe: string) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
