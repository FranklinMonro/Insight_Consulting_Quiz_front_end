/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    QuizRoutingModule,
  ],
})
export class QuizModule { }
