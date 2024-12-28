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

    if (err.name == 'Unauthorized') {
        httpStatus = 401
        status = 108
        message = 'Token tidak tidak valid atau kadaluwarsa'
    }

    if (err.name == 'NotFound') {
        httpStatus = 404
        status = 404
        message = 'Data tidak ada'
    }

    if (err.name == 'errorUpload') {
        httpStatus = 400
        status = 102
        message = 'Format Image Tidak Sesuai'
    }

    if (err.name == 'BadRequestTopUp') {
        httpStatus = 400
        status = 102
        message = 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'
    }

    if (err.name == 'NotFoundService') {
        httpStatus = 400
        status = 102
        message = 'Service ataus Layanan tidak ditemukan'
    }
    
    res.status(httpStatus).json({
        status,
        message,
        data: null
    })
}

module.exports= errorHandler