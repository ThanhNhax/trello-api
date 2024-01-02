import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = (req, res, next) => {
  try {
    //Nhận dữ liệu ở FE qua req.body
    console.log(req.body)
    // abortEarly: false :: trả về tất cả error khi dữ liệu có nhiều lỗi

    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller' })
  } catch (err) {
    console.log(err)
    // StatusCodes.UNPROCESSABLE_ENTITY: mã 422('lỗi về kiểm tra dữ liệu FE gửi lên')
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: err.message })
  }
}

export const boardController = {
  createNew
}
