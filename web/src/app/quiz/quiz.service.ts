/* eslint-disable import/prefer-default-export */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import environment from '../../enviroments/enviroments';
import {
  PlayerAnswerAttributes, QuestionsAnswerAttributes, QuizAttributes, QuizQuestionAttributes,
} from './quiz.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private httpClient: HttpClient) { }

  public getQuizes = (): Observable<QuizAttributes[]> => this.httpClient.get<QuizAttributes[]>(
    `${environment.apiUrl}quizapi/quizroutes/quiz`,
    { observe: 'response' },
  ).pipe(
    map((res: any) => {
      if (!res.body) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );

  public getQuestionCount = (quizid: number): Observable<number> => this.httpClient.get<number>(
    `${environment.apiUrl}quizapi/quizroutes/quizcount/${quizid}`,
    { observe: 'response' },
  ).pipe(
    map((res: any) => {
      if (!res.body) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );

  public getQuizQuestion = (
    quizid: number,
    questionid: number,
  ): Observable<QuizQuestionAttributes> => this.httpClient.get<QuizQuestionAttributes>(
    `${environment.apiUrl}quizapi/quizroutes/questions/${quizid}/${questionid}`,
    { observe: 'response' },
  ).pipe(
    map((res: any) => {
      if (!res.body) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );

  public getQuestionAnswers = (
    quizid: number,
    questionid: number,
  ): Observable<QuestionsAnswerAttributes[]> => this.httpClient.get<QuestionsAnswerAttributes[]>(
    `${environment.apiUrl}quizapi/quizroutes/questionanswer/${quizid}/${questionid}`,
    { observe: 'response' },
  ).pipe(
    map((res: any) => {
      if (!res.body) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );

  public postPlayerAnswer = (
    playerAnswer: PlayerAnswerAttributes,
  ): Observable<PlayerAnswerAttributes> => this.httpClient.post<PlayerAnswerAttributes>(
    `${environment.apiUrl}quizapi/answerroutes/`,
    playerAnswer,
    { observe: 'response' },
  ).pipe(
    map((res: any) => {
      if (!res.body) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );

  public getAllAnswers = (
    answersID: string[],
  ): Observable<PlayerAnswerAttributes[]> => this.httpClient.get<string[]>(
    `${environment.apiUrl}quizapi/answerroutes/${answersID}`,
    { observe: 'response' },
  ).pipe(
    map((res: any) => {
      if (!res.body) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );
}
