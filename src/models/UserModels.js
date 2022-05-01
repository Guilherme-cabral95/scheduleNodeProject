const mongoose = require('mongoose')
const { use } = require('../../router')


const constats_schema = new mongoose.Schema({ 
    name: {type:String,required:true}, 
    email: {type:String,required:true}, 
    phone: {type:String,required:false} 
})

const users_schema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    contacts:[constats_schema]
})

const userModel = mongoose.model('usersContats',users_schema)

class Users{
    constructor(body = null,Users = null){
        this.body = body,
        this.errors = []
        this.Users = Users
    }

    validate(){
        if(!this.body.email) this.errors.push('O campo email é obrigatório')
        if(!this.body.password) this.errors.push('O campo senha é obrigatório')

        
    }

    validateContacts(){
        if(!this.body.name) this.errors.push('O campo nome é obrigatório')
        if(!this.body.email) this.errors.push('O campo email é obrigatório')
    }

    async create(){
        this.validate();
        if(this.errors.length > 0) return;
        const created = await userModel.create(this.body)
        this.Users = created
    }

    async loginUser(){
        this.validate();
        this.Users = await userModel.findOne({email:this.body.email,password:this.body.password})
        return  this.Users
    }

    async findByIdUser(){
        return await userModel.findById(this.Users._id)
    }

    async addContats(){

        this.validateContacts();
        if(this.errors.length > 0) return;
        const user = await this.findByIdUser()
        user.contacts.push(this.body)
        const created = await user.save()
        this.Users = created
    }

    async findContact(){
        const users = await this.findByIdUser()
        if(users.contacts.length > 0 ){ 
            return await users.contacts.id(this.body.id)
        }
    }

    async deletedContacts(){

        const users = await this.findByIdUser()
        if(users.contacts.length > 0 ){
            await users.contacts.id(this.body.id).remove()
            await users.save()
        }

    }

    async editConacts(){
        this.validateContacts();
        if(this.errors.length > 0) return;
        const users = await this.findByIdUser()
        if(users.contacts.length > 0 ){
            const contacts =  await users.contacts.id(this.body.id) 
            contacts.name = this.body.name
            contacts.email = this.body.email
            contacts.phone = this.body.phone
            await users.save()
        }
    }
}

module.exports = Users