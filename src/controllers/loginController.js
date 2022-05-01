const userModel = require('../models/UserModels')
const cript = require('crypto')

exports.index = (req,res)=>{
    if(req.session.users !== undefined ){
        req.session.save(function(){
            return res.redirect('home')
        })
        return
    }
    res.render('pages/login',{session:req.session.users})
}

exports.createUser =(req,res)=>{
    res.render('pages/createdUser',{session:undefined})
}

exports.insertUserDB = async(req,res)=>{
    req.body.password = cript.createHash('sha1').update(req.body.password).digest('hex')
    const Users = new userModel(req.body)
    await Users.create()
    if(Users.errors.length > 0){
        req.flash('errors',Users.errors)
        req.session.save(function(){
            return res.redirect('createdUser')
        })
        return
    }    

    req.flash('success','Login Cadastrado com sucesso')
    req.session.save(function(){
        return res.redirect('createdUser')
    })
}

exports.loginUser = async (req,res)=>{
    req.body.password = cript.createHash('sha1').update(req.body.password).digest('hex')
    
    const Users = new userModel(req.body)
    
    const login = await Users.loginUser()
    
    if(login != undefined){
        req.session.users = login
        req.session.save(function(){
            return res.redirect('home')
        })
        return 
    }

    Users.errors.push('login ou senha estão invalidos')
    req.flash('errors',Users.errors)  
    req.session.save(function(){
        return res.redirect('back')
    })
    return 

}

