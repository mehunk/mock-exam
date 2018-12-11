import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Question, Category } from '../../model';
import * as fromRoot from '../../store/reducers';
import { LoadUserQuestions } from '../../store/actions';

/**
 * MyQuestionsComponent 类，表示我的问题列表组件
 */
@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent implements OnInit {

  private questions$: Observable<Question[]>;
  private categoryDict$: Observable<{[key: number]: Category}>;

  constructor (
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit () {
    this.categoryDict$ = this.store.pipe(select(fromRoot.getCategoryEntities));
    this.questions$ = this.store.pipe(select(fromRoot.getUserQuestions));
    this.store.pipe(
      select(fromRoot.getUser)
    ).subscribe(
      user => this.store.dispatch(new LoadUserQuestions(user))
    );
  }
}
