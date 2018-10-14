import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Category, Question, Answer } from '../../model';
import { CategoryService, TagService, QuestionService } from '../../services';
import * as fromRoot from '../../store/reducers';
import * as actions from '../../store/actions';

@Component({
  selector: 'app-question-add-update',
  templateUrl: './question-add-update.component.html',
  styleUrls: ['./question-add-update.component.css']
})
export class QuestionAddUpdateComponent implements OnInit {

  public categories: Category[];

  public question: Question;

  public questionForm: FormGroup;

  public tags: string[];
  public autoTags: string[] = [];
  public enteredTags: string[] = [];

  get answers (): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  get tagsArray(): FormArray {
    return this.questionForm.get('tagsArray') as FormArray;
  }


  constructor (
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private tagService: TagService,
    private questionService: QuestionService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.question = new Question();
    this.createForm(this.question);

    const questionControl = this.questionForm.get('questionText');

    questionControl.valueChanges.pipe(debounceTime(500)).subscribe(v => this.computeAutoTags());
    this.answers.valueChanges.pipe(debounceTime(500)).subscribe(v => this.computeAutoTags());

    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  /**
   * 自动将已有的标签和当前问题和答案的内容匹配，并设置到标签组中
   */
  public computeAutoTags() {
    const formValue = this.questionForm.value;
    const allTextValues: string[] = [formValue.questionText];
    formValue.answers.forEach(answer => allTextValues.push(answer.answerText));

    const wordString: string = allTextValues.join(' ');

    const matchingTags: string[] = [];
    this.tags.forEach(tag => {
      const patt = new RegExp('\\b(' + tag.replace('+', '\\+') + ')\\b', 'ig');
      wordString.match(patt) && matchingTags.push(tag); // tslint:disable-line
    });
    this.autoTags = matchingTags;

    this.setTagsArray();
  }

  public setTagsArray() {
    this.tagsArray.controls = [];
    [...this.autoTags, ...this.enteredTags].forEach(tag => this.tagsArray.push(new FormControl(tag)));
  }

  public createForm (question: Question) {
    // 创建答案表单组
    const fgs: FormGroup[] = question.answers.map(answer => new FormGroup({
      answerText: new FormControl(answer.answerText, Validators.required),
      correct: new FormControl(answer.correct),
    }));

    // 创建标签表单组
    let fcs: FormControl[] = question.tags.map(tag => new FormControl(tag));
    if (fcs.length === 0) {
      fcs = [new FormControl('')];
    }

    this.questionForm = this.fb.group({
      category: [(question.categories.length > 0 ? question.categories[0] : ''), Validators.required],
      questionText: [question.questionText, Validators.required],
      tags: '',
      tagsArray: this.fb.array(fcs),
      answers: this.fb.array(fgs),
      ordered: [question.ordered],
      explanation: [question.explanation]
      }, { validator: questionFormValidator }
    );
  }

  public onSubmit() {
    this.questionForm.updateValueAndValidity();
    if (this.questionForm.invalid) {
      return;
    }

    console.log(this.questionForm.value);
    const question: Question = this.getQuestionFromFormValue(this.questionForm.value);
    console.log(question);

    this.saveQuestion(question);
  }

  private getQuestionFromFormValue(formValue: any): Question {
    let question: Question;

    question = new Question();
    question.questionText = formValue.questionText;
    question.answers = formValue.answers;
    question.categoryIds = [formValue.category];
    question.tags = [...this.autoTags, ...this.enteredTags];
    question.ordered = formValue.ordered;
    question.explanation = formValue.explanation;

    return question;
  }

  private saveQuestion(question: Question) {
    this.store.dispatch(new actions.AddQuestion(question));
  }

  public addTag() {
    const tag = this.questionForm.get('tags').value;
    if (tag) {
      (this.enteredTags.indexOf(tag) < 0) && this.enteredTags.push(tag) // tslint:disable-line
      this.questionForm.get('tags').setValue('');
    }
    this.setTagsArray();
  }

  public removeEnteredTag(tag) {
    this.enteredTags = this.enteredTags.filter(t => t !== tag);
    this.setTagsArray();
  }
}

function questionFormValidator (fg: FormGroup): {[key: string]: boolean} | null {
  const answers: Answer[] = fg.get('answers').value;
  // 正确答案数量不能少于 1
  if (answers.filter(answer => answer.correct).length !== 1) {
    return { 'correctAnswerCountInvalid': true };
  }
  // 标签不能少于 3 个
  const tags: string[] = fg.get('tagsArray').value;
  if (tags.length < 3) {
    return { 'tagCountInvalid': true };
  }

  return null;
}
