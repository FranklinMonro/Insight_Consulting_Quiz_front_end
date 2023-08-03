/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { QuizService } from './quiz.service';
import { QuizAttributes, QuizQuestionAttributes } from './quiz.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  public pickQuiz: boolean = false;

  public quizNames: QuizAttributes[] = [];

  public quistionNumber: number = 1;

  public pickQuestion: boolean = false;

  public question: string = '';

  public quizQuestion: QuizQuestionAttributes = {};

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

  public pickAQuiz = (quizID: number, questionID: number): void => {
    console.log(quizID, questionID);
    this.spinner.show();
  };

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
