import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Question } from '../../model';
import { QuestionService } from '../../services';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  private questions$: Observable<Question[]>;

  constructor (private questionService: QuestionService) { }

  ngOnInit() {
    this.questions$ = this.questionService.getQuestions();
  }
}
