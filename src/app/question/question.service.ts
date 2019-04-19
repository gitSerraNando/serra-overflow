import { Injectable } from '@angular/core';
import { Question } from './question.model';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
// import 'rxjs/add/observable/throw';
// import { catchError } from 'rxjs/operators';
import { Answer } from '../answer/answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }
  private questionsUrl: string;

  public getQuestions(sort = '-createdAt'): Promise<void | Question[]> {
    return this.http
      .get(`${this.questionsUrl}?sort=${sort}`)
      .toPromise()
      .then(response => response as Question[])
      .catch(this.handleError);
  }

  public getQuestion(id): Promise<void | Question> {
    const url = urljoin(this.questionsUrl, id);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Question)
      .catch(this.handleError);
  }
  public getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  public addQuestion(question: Question): Observable<any> {
    const body = JSON.stringify(question);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();

    return this.http
      .post(this.questionsUrl + token, body, { headers })
      .map((response: HttpResponse<Question>) => response)
      .catch((error: HttpResponse<Question>) => Observable.throw(error));
  }
  public addAnswer(answer: Answer): Observable<any> {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = urljoin(
      this.questionsUrl,
      answer.question._id.toString(),
      'answers'
    );
    const token = this.getToken();

    return this.http
      .post(url + token, body, { headers })
      .map((response: HttpResponse<Answer>) => response)
      .catch((error: HttpResponse<Answer>) => Observable.throw(error));
  }

  public handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} -  ${error.statusText}`
      : 'Server error';
    console.log(errMsg);
  }
}
