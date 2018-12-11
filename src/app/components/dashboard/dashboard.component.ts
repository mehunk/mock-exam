import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Category, Question } from '../../model';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public categories$: Observable<Category[]>;
  public categoryDict$: Observable<{[key: number]: Category}>;
  public tags$: Observable<string[]>;
  public questions$: Observable<Question[]>;

  constructor (
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.categories$ = this.store.pipe(select(fromRoot.getCategories));
    this.categoryDict$ = this.store.pipe(select(fromRoot.getCategoryEntities));
    this.tags$ = this.store.pipe(select(fromRoot.getTags));
    this.questions$ = this.store.pipe(select(fromRoot.getQuestions));
  }

}
