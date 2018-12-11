import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Question, Category } from '../../model';
import * as fromRoot from '../../store/reducers';
import { LoadUnpublishedQuestions, ApproveQuestion } from '../../store/actions';

/**
 * AdminQuestionsComponent 类，表示管理员问题列表组件
 */
@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent implements OnInit {

  public questions$: Observable<Question[]>;
  public unpublishedQuestions$: Observable<Question[]>;
  public categoryDict$: Observable<{[key: number]: Category}>;

  constructor (
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit () {
    this.questions$ = this.store.pipe(select(fromRoot.getQuestions));
    this.unpublishedQuestions$ = this.store.pipe(select(fromRoot.getUnpublishedQuestions));
    this.categoryDict$ = this.store.pipe(select(fromRoot.getCategoryEntities));
    this.store.dispatch(new LoadUnpublishedQuestions());
  }

  /**
   * 审批问题
   *
   * @param question - 问题
   */
  public approveQuestion (question: Question) {
    this.store.pipe(
      select(fromRoot.getUser)
    ).subscribe(user => {
      question.approved_uid = user.userId;
      this.store.dispatch(new ApproveQuestion(question));
    });
  }
}
