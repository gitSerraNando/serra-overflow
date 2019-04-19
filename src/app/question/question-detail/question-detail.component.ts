import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '@app/question/question.model';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
  providers: [QuestionService]
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
  public question?: Question;
  public loading = true;
  public sub: any;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.questionService.getQuestion(params.id).then((question: Question) => {
        console.log('question', question);
        this.question = question;
        console.log('this.question', this.question);
        this.loading = false;
      });
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
