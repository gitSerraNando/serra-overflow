import { Answer } from '@app/answer/answer.model';

export class Question {
  public _id?: string;
  public title: string;
  public description: string;
  public createdAt?: Date;
  public icon?: string;
  public answers: Answer[];

  constructor(
    title: string,
    description: string,
    createdAt?: Date,
    icon?: string
  ) {
    this._id = '1';
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.icon = icon;
    this.answers = [];
  }
}
