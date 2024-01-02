import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formatter'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    return getNewBoard
  } catch (err) {
    throw new Error(err)
  }
}

export const boardService = {
  createNew
}
