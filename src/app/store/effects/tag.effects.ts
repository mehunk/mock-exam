import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { TagService } from '../../services';
import { LoadTags, LoadTagsSuccess, TagActionTypes } from '../actions';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TagEffects {
  constructor (
    private actions$: Actions,
    private tagService: TagService
  ) {}

  @Effect()
  public loadTags: Observable<Action> = this.actions$.pipe(
    ofType<LoadTags>(TagActionTypes.LoadTags),
    switchMap(() =>
      this.tagService.getTags().pipe(
        map((tags: string[]) => new LoadTagsSuccess(tags))
      )
    )
  );
}
