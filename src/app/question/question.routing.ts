import { QuestionScreenComponent } from '@app/question/question-screen/question-screen.component';
import { QuestionDetailComponent } from '@app/question/question-detail/question-detail.component';
import { QuestionFormComponent } from '@app/question/question-form/question-form.component';

export const QUESTION_ROUTER = [
  { path: '', component: QuestionScreenComponent },
  { path: 'new', component: QuestionFormComponent },
  { path: ':id', component: QuestionDetailComponent }
];
