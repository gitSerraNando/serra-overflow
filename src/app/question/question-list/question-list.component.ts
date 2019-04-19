import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '@app/question/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  providers: [QuestionService]
})
export class QuestionListComponent implements OnInit {
  public questions: Question[];
  public loading = true;

  @Input() public sort = '-createAt';

  constructor(private questionService: QuestionService) {}

  public ngOnInit() {
    this.questionService
      .getQuestions(this.sort)
      .then((questions: Question[]) => {
        this.questions = questions;
        this.loading = false;
      });
  }
}
