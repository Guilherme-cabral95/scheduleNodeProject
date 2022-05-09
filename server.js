require('dotenv').config()

const express = require('express')

const app = express()

const path = require('path')

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


const cors = require('cors')

const router = require('./router')

const middlewares = require('./src/middlewares/middlewaresGlobal')


app.use(express.static('public'))

app.use(flash())

app.set('views',path.resolve(__dirname,'src','views'))

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use(helmet())

app.use(csurf())

app.use(middlewares.middlewareGlobal)

app.use(middlewares.checkCsrf)

app.use(middlewares.generateCsrf)


app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(router)

app.on('conect',()=>{
    app.listen(process.env.port)
    console.log('conectado')
})

