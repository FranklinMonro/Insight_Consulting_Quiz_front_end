/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule,
    NgxSpinnerModule,
    QuizRoutingModule,
  ],
})
export class QuizModule { }
