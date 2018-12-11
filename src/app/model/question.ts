import { Category } from './category';

export class Question {
  id: string;
  key: string;
  questionText: string;
  answers: Answer[];
  ordered: boolean;
  explanation?: string;
  tags: string[];
  categories: Category[];
  published: boolean;
  status: QuestionStatus;
  created_uid?: string;
  createdOn?: Date;
  lastUpdatedBy?: string;
  lastUpdatedOn?: Date;
  approved_uid?: string;
  approvedOn?: Date;
  categoryIds?: number[];

  constructor() {
    this.answers = [new Answer(), new Answer(), new Answer(), new Answer()];
    this.ordered = false;
    this.tags = [];
    this.categories = [];
    this.published = false;
    this.status = QuestionStatus.SAVED;
  }
}

export class Answer {
  id: number;
  answerText: string;
  correct: boolean;
}

export enum QuestionStatus {
  SAVED,
  SUBMITTED,
  APPROVED,
  INACTIVE
}
