import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TagService } from '../../services';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  public tags$: Observable<string[]>;

  constructor (private tagService: TagService) { }

  ngOnInit() {
    this.tags$ = this.tagService.getTags();
  }

}
