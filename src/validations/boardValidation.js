import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    //Nhận dữ liệu ở FE qua req.body
    console.log(req.body)
    // abortEarly: false :: trả về tất cả error khi dữ liệu có nhiều lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation' })
  } catch (err) {
    console.log(err)
    // StatusCodes.UNPROCESSABLE_ENTITY: mã 422('lỗi về kiểm tra dữ liệu FE gửi lên')
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: new Error(err).message })
  }
}

export const boardValidation = {
  createNew
}
