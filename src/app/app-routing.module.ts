import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionScreenComponent } from '../app/question/question-screen/question-screen.component';
import { SigninScreenComponent } from '@app/auth/signin-screen/signin-screen.component';
import { SignupScreenComponent } from '@app/auth/signup-screen/signup-screen.component';

import { QUESTION_ROUTER } from '@app/question/question.routing';

const routes: Routes = [
  { path: '', component: QuestionScreenComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninScreenComponent },
  { path: 'signup', component: SignupScreenComponent },
  { path: 'questions', children: QUESTION_ROUTER }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
