import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  public tags$: Observable<string[]>;

  constructor (private store: Store<fromRoot.State>) {
    this.tags$ = store.pipe(select(fromRoot.getTags));
  }

  ngOnInit() {}
}
