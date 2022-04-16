

exports.checkCsrf = (err, req, res, next)=>{
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(403)
    res.send('form tampered with')
}


exports.generateCsrf = (req,res,next)=>{
    res.locals.csrfToken = req.csrfToken()
    next()
}