import { Action } from '@ngrx/store';

// 声明动作枚举类型
export enum TagActionTypes {
  LoadTags = '[Tag] Load Tags',
  LoadTagsSuccess = '[Tag] Load Tags Success'
}

export class LoadTags implements Action {
  readonly type = TagActionTypes.LoadTags;
}

export class LoadTagsSuccess implements Action {
  readonly type = TagActionTypes.LoadTagsSuccess;

  constructor (public payload: string[]) {}
}

export type TagActionsUnion =
  | LoadTags
  | LoadTagsSuccess;
