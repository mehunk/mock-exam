import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Category } from '../../model';
import { LoadCategoriesSuccess, CategoryActionTypes, LoadCategories } from '../actions/category.actions';
import { CategoryService } from '../../services';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CategoryEffects {
  constructor (
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  @Effect()
  public loadCategories: Observable<Action> = this.actions$.pipe(
    // 开始动作
    ofType<LoadCategories>(CategoryActionTypes.LoadCategories),
    // 切换到新的动作订阅
    switchMap(() =>
      this.categoryService.getCategories().pipe(
        map((categories: Category[]) => new LoadCategoriesSuccess(categories))
      )
    )
  );
}
