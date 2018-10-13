import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Question } from '../../model';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public questions$: Observable<Question[]>;
  public questions: Question[];

  constructor (private store: Store<fromRoot.State>) {
    this.questions$ = store.pipe(select(fromRoot.getQuestionsWithCategory));
  }

  ngOnInit() {}
}
