import { Dificulty, Categories, CategoriesNumber } from './types'

export const getQuestions = async (dificulty: Dificulty, category: Categories) => {
  try {
    const categoryNumber = CategoriesNumber[category]

    const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${categoryNumber}&difficulty=${dificulty}&type=multiple`)
    const json = await response.json()

    return json
  }
  catch (error) {
    throw new Error('Algo Deu Errado')
  }
}