/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { QuizService } from './quiz.service';
import { QuizAttributes } from './quiz.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  public quizNames: QuizAttributes[] = [];

  public quistionNumber: number = 1;

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
        this.quizNames = resp;
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
