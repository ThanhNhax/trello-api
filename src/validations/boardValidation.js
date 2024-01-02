import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import CustomerError from '~/utils/CustomerError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    // abortEarly: false :: trả về tất cả error khi dữ liệu có nhiều lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validation xong roi thi chyen sang controller
    next()
  } catch (err) {
    next(
      new CustomerError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        new Error(err.message)
      )
    )
  }
}

export const boardValidation = {
  createNew
}
