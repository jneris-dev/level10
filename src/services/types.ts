export type Dificulty = 'easy' | 'medium' | 'hard'

export type Categories =
  | 'General Knowledge'
  | 'Mythology'
  | 'Sports'
  | 'Geography'
  | 'History'
  | 'Politics'

export enum CategoriesNumber {
  'General Knowledge' = 9,
  'Mythology' = 20,
  'Sports' = 21,
  'Geography' = 22,
  'History' = 23,
  'Politics' = 24,
}

type Results = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type Response = {
  response_code: number
  results: Results[]
}