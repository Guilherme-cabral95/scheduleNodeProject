const userModel = require('../models/UserModels')

exports.index = async (req,res)=>{
    const UsersModel = new userModel(null, req.session.users)
    const list = await UsersModel.findByIdUser()
    res.render('pages/home',{session:req.session.users,list: list.contacts})
}

exports.redirectCreatedContats =  (req,res) =>{
    let contact = {
        name:'',
        email:'',
        phone: '',
        _id:''
    }
   
    res.render('pages/createdContats',{session:req.session.users,contacts:contact })
}


exports.redirectUpdatedContats = async ( req,res)=>{
    let contact = {
        name:'',
        email:'',
        phone: '',
        _id:''
    }
    if(req.params.id != undefined){
        const Users = new userModel(req.params,req.session.users)
        contact = await Users.findContact()
    }

    res.render('pages/createdContats',{session:req.session.users,contacts:contact })

}

exports.addContats = async (req,res)=>{
    const Users = new userModel(req.body,req.session.users)
    let frase = "" 
    let link = ""
    if(req.body.id != ""){
        await Users.editConacts()
        frase= "editado"
        link = "home"
    }else{

        await Users.addContats()
        frase= "Adicionado"
        link = "new_contacts"
    }
    if(Users.errors.length > 0){
        req.flash('errors',Users.errors)
        req.session.save(function(){
            return res.redirect('new_contacts')
        })
        return
    } 

    req.flash('success',`Contato ${frase} com sucesso`)
    req.session.save(function(){
        return res.redirect(link)
    })
}


exports.deletedContacts = async (req,res)=>{
    const Users = new userModel(req.params,req.session.users)
    await Users.deletedContacts()
    req.flash('success','Contato Removido com sucesso')
    req.session.save(function(){
        return res.redirect('../home')
    })
}


