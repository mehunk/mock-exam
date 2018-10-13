import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as Actions from '../../store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Mock exam!';

  constructor (
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit () {
    this.store.dispatch(new Actions.LoadCategories());
    this.store.dispatch(new Actions.LoadTags());
    this.store.dispatch(new Actions.LoadQuestions());
  }
}
