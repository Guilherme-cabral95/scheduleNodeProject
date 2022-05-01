require('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require('mongoose')

const flash = require('connect-flash')

const session = require('express-session')

const MongoStore = require('connect-mongo')

mongoose.connect(process.env.mongo_connect,{useNewUrlParser: true, useUnifiedTopology: true})
.then(res=>{
    app.emit('conect')
}).catch(res => console.log(res.message))

app.use(session({
    secret:process.env.secret_sesion,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl:process.env.mongo_connect}),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 2,
        httpOnly:true
    }
}))

const helmet = require("helmet");

const csurf = require('csurf')


const router = require('./router')

const middlewares = require('./src/middlewares/middlewaresGlobal')


app.use(express.static('public'))

app.use(flash())

app.set('views','./src/views')

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use(helmet())

app.use(csurf())

app.use(middlewares.middlewareGlobal)

app.use(middlewares.checkCsrf)

app.use(middlewares.generateCsrf)

app.use(router)

app.on('conect',()=>{
    app.listen(process.env.port)
    console.log('conectado')
})

