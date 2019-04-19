import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import 'hammerjs';
import { QuestionDetailComponent } from './question/question-detail/question-detail.component';
import { MomentModule } from 'angular2-moment';
import { AnswerFormComponent } from './answer/answer-form/answer-form.component';
import { SigninScreenComponent } from './auth/signin-screen/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen/signup-screen.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionFormComponent } from './question/question-form/question-form.component';
import { AuthService } from '@app/auth/auth.service';
import { QuestionScreenComponent } from './question/question-screen/question-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SigninScreenComponent,
    SignupScreenComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
