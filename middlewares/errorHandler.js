const errorHandler = (err, req, res, next) => {
    let httpStatus = 500
    let status = 500 
    let message = 'Internal server error'

    if (err.name == 'SequelizeValidationError') {
        httpStatus =  400
        status = 102
        message = err.errors[0].message
    }

    if (err.name == 'SequelizeUniqueConstraintError') {
        httpStatus = 400
        status = 102
        message = err.errors[0].message
    }

    if (err.name == 'BadRequest') {
        httpStatus = 400
        status = 102
        message = 'Paramter email tidak sesuai format'
    }

    if (err.name == 'LoginError') {
        httpStatus = 401
        status = 103
        message = 'username atau password salah'
    }

    res.status(httpStatus).json({
        status,
        message,
        data: null
    })
}
module.exports= errorHandler