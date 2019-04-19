import { Question } from '@app/question/question.model';
import { User } from '@app/auth/user.model';

export class Answer {
  constructor(
    public description: string,
    public question: Question,
    public createdAt?: Date,
    public user?: User
  ) {}
}
