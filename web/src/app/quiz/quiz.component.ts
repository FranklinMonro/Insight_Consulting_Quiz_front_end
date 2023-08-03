/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { QuizService } from './quiz.service';
import { PlayerAnswerAttributes, QuestionsAnswerAttributes, QuizAttributes } from './quiz.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  public pickQuiz: boolean = false;

  public quizID: number = 0;

  public questionCount: number = 0;

  public quizNames: QuizAttributes[] = [];

  public quistionNumber: number = 0;

  public pickQuestion: boolean = false;

  public question: string = '';

  public questionsAnswers: QuestionsAnswerAttributes[] = [];

  public playerAnswerID: string[] = [];

  public showScore: boolean = false;

  public playerCorrect: number = 0;

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
        this.showScore = false;
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

  public getQuizCount = (quizID: number): void => {
    this.spinner.show();
    this.subcription = this.quizService.getQuestionCount(quizID).subscribe({
      next: (resp: any) => {
        const { count } = resp.body;
        this.questionCount = count;
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
        this.showScore = false;
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
        this.showScore = false;
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

  public playerAnswers = (answer: PlayerAnswerAttributes): void => {
    this.spinner.show();
    this.subcription = this.quizService.postPlayerAnswer(answer).subscribe({
      next: (resp: any) => {
        const { id } = resp.body;
        this.playerAnswerID.push(id);
        if (this.playerAnswerID.length === this.questionCount) {
          this.allAnswers(this.playerAnswerID);
        }
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

  public allAnswers = (answersID: string[]): void => {
    this.spinner.show();
    this.subcription = this.quizService.getAllAnswers(answersID).subscribe({
      next: (resp: any) => {
        const countCorrect = resp.body
          .map((answ: PlayerAnswerAttributes) => answ.is_correct)
          .filter((correct: boolean) => correct);
        this.playerCorrect = countCorrect.length;
        this.pickQuiz = false;
        this.pickQuestion = false;
        this.showScore = true;
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

  public restartQuiz = (): void => {
    window.location.reload();
  };

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
