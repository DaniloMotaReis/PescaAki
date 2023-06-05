const express = require("express");
const session = require('express-session')
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const app = express();
const pesqueiro = require('./routes/route_pesqueiro');
const login = require('./routes/route_login_cadastro');
const reserva = require('./routes/route_reserva');

app.use('/css',express.static('public/css'));
app.use('/img',express.static('public/img'));

app.use(session({
    secret: 'mykey',
    resave:true,
    saveUnitialized: true
}));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash("success_msg");
    res.locals.error_msg=req.flash("error_msg")
    ;res.locals.login_msg=req.flash("login_msg");
    next();
})


app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine({ defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use('/pescaaki', login,pesqueiro,reserva);

const PORT = 8081;

app.listen(PORT, () =>{
    console.log("Servidor Rodando");
});