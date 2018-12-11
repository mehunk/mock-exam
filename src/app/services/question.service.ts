import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

import {Question, QuestionStatus, User} from '../model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor (
    private db: AngularFireDatabase
  ) { }

  public getQuestions (): Observable<Question[]> {
    return this.db.list<Question>('questions/published').valueChanges();
  }

  public saveQuestion (question: Question): Observable<any> {
    return from(this.db.list<Question>('questions/unpublished')
      .push(question))
      .pipe(
        tap(createdQuestion => {
          if (createdQuestion.key) {
            this.db.object(`users/${question.created_uid}/questions`)
              .update({[createdQuestion.key]: 'unpublished'});
          }
        })
      );
  }

  /**
   * 获取当前用户的所有问题列表
   *
   * @param user - 用户信息
   */
  public getUserQuestions (user: User): Observable<Question[]> {
    return this.db.list<string>(`users/${user.userId}/questions`)
      .snapshotChanges() // 为了访问元数据，需要使用此方法
      .pipe(
        map(questionId2StatusMaps => {
          const questions: Question[] = [];
          questionId2StatusMaps.forEach(questionId2Status => {
            this.db.object<Question>(`questions/${questionId2Status['payload'].val()}/${questionId2Status['key']}`)
              .valueChanges()
              .pipe(first())
              .subscribe(question => questions.push(question));
          });
          return questions;
        })
      );
  }

  /**
   * 获取所有未发布问题列表
   */
  public getUnpublishedQuestions (): Observable<Question[]> {
    return this.db.list<Question>('questions/unpublished')
      .snapshotChanges()
      .pipe(
        map(questions => questions.map(question => ({ key: question.key, ...question.payload.val()})))
      );
  }

  public approveQuestion (question: Question) {
    question.status = QuestionStatus.APPROVED;
    this.db.object('questions/published')
      .update({[question.key]: question}) // 在发布问题节点下创建问题
      .then(() => {
        this.db.object(`users/${question.created_uid}/questions`).update({[question.key]: 'published'}); // 更新用户问题节点下的状态
        this.db.object(`questions/unpublished/${question.key}`).remove(); // 在未发布问题节点下的删除问题
      })
      .catch(err => console.error(err));
  }
}
