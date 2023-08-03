interface QuizAttributes {
  quiz_id?: number;
  quiz_name?: string;
}

interface QuizQuestionAttributes {
  question_id?: number;
  quiz_id?: number;
  questions?: string;
}

interface QuestionsAnswerAttributes {
  answer_id?: number;
  question_id?: number;
  quiz_id?: number;
  answer?: string;
  is_correct?: boolean;
}

interface PlayerAnswerAttributes {
  id?: string;
  answer?: string;
  is_correct?: boolean;
  date?: string;
}

export {
  QuizAttributes,
  QuizQuestionAttributes,
  QuestionsAnswerAttributes,
  PlayerAnswerAttributes,
};
