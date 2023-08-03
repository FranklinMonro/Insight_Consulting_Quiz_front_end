/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { QuizService } from './quiz.service';
import { QuestionsAnswerAttributes, QuizAttributes } from './quiz.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  public pickQuiz: boolean = false;

  public quizID: number = 0;

  public quizNames: QuizAttributes[] = [];

  public quistionNumber: number = 0;

  public pickQuestion: boolean = false;

  public question: string = '';

  public questionsAnswers: QuestionsAnswerAttributes[] = [];

  constructor(
    private quizService: QuizService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getQuizNames();
  }

  private getQuizNames = (): void => {
    this.spinner.show();
    this.subcription = this.quizService.getQuizes().subscribe({
      next: (resp: any) => {
        this.toastr.success('Quiz Names Received', 'SUCCESS');
        this.quizNames = resp.body;
        this.pickQuiz = true;
        this.pickQuestion = false;
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  };

  public pickAQuizQuestion = (quizID: number, questionID: number): void => {
    this.spinner.show();
    this.subcription = this.quizService.getQuizQuestion(quizID, questionID).subscribe({
      next: (resp: any) => {
        this.toastr.success('Quiz Question Received', 'SUCCESS');
        const { question_id, quiz_id, questions } = resp.body;
        this.question = questions;
        this.questionAnswers(quiz_id, question_id);
        this.pickQuiz = false;
        this.pickQuestion = true;
        this.quizID = quizID;
        this.quistionNumber = questionID;
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  };

  public questionAnswers = (quizID: number, questionID: number): void => {
    this.spinner.show();
    this.subcription = this.quizService.getQuestionAnswers(quizID, questionID).subscribe({
      next: (resp: any) => {
        this.questionsAnswers = resp.body;
        this.pickQuiz = false;
        this.pickQuestion = true;
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  };

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
