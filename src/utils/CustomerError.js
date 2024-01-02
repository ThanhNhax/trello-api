class CustomerError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.name = 'CustomerError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default CustomerError
