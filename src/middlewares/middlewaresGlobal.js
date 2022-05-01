exports.checkSessionActive = (req,res,next)=>{
    if(req.session.users == undefined ){
        error = []
        error.push('O usuário não está logado')
        req.flash('errors',error)
        req.session.save(function(){
            return res.redirect('/')
        })
        return
    }
    next()
}

exports.middlewareGlobal =(req,res,next)=>{
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    next()
}

exports.checkCsrf = (err, req, res, next)=>{
    if (err && err.code === 'EBADCSRFTOKEN'){
        res.render('pages/404_error',{session:req.session.users})
    }
}


exports.generateCsrf = (req,res,next)=>{
    res.locals.csrfToken = req.csrfToken()
    next()
}


exports.exit = (req,res,next)=>{
    req.session.destroy(function(){
        return  res.redirect('/')
    });
   return
}
