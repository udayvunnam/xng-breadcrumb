import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { CodeBlockService } from '../../core/code-block.service';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit, AfterViewChecked {
  @Input() language = 'javascript';
  @Input() code: string;
  @ViewChild('el', { read: ElementRef, static: true }) el: ElementRef;

  constructor(private codeBlockService: CodeBlockService) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.codeBlockService.highlight(this.el, this.code, this.language);
  }
}
