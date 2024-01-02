import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = (req, res, next) => {
  try {
    //Nhận dữ liệu ở FE qua req.body
    console.log(req.body)
    // abortEarly: false :: trả về tất cả error khi dữ liệu có nhiều lỗi

    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller' })
  } catch (err) {
    next(err)
  }
}

export const boardController = {
  createNew
}
