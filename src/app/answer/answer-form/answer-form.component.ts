import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '@app/question/question.model';
import { Answer } from '@app/answer/answer.model';
import { QuestionService } from '../../question/question.service';
import SweetScroll from 'sweet-scroll';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss'],
  providers: [QuestionService]
})
export class AnswerFormComponent {
  @Input()
  public question: Question;
  public sweetScroll: SweetScroll;
  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.sweetScroll = new SweetScroll();
  }

  public onSubmit(form: NgForm) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
    const answer = new Answer(form.value.description, this.question);
    this.questionService.addAnswer(answer).subscribe(a => {
      this.question.answers.unshift(a);
      this.sweetScroll.to('#title');
    }, this.authService.handleError);
    form.reset();
  }
}
