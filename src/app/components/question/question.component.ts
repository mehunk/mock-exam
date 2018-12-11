import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Question, Category, QuestionStatus } from '../../model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() public questions: Question[];
  @Input() public categoryDict: {[key: number]: Category};
  @Input() public showApproveButton: boolean;
  @Output() public approveClicked = new EventEmitter<Question>();

  constructor () {}

  ngOnInit() {}

  public getDisplayStatus (status: number): string {
    return QuestionStatus[status];
  }

  public approveButtonClicked (question: Question) {
    this.approveClicked.emit(question);
  }
}
