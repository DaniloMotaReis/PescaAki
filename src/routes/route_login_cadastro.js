const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render("admin/login", {layout: 'ini'});
});

router.post('/login/usuario', (req, res) => {
    Usuario.findOne({ where:{ email:req.body.email, senha:req.body.senha } }).then(function (login) {
            var usu = JSON.parse(JSON.stringify(login));
            if (login != null) {
                req.session.email = usu.email;
                res.redirect("/pescaaki/feed");
            } else {
                req.flash('login_msg', 'Senha ou E-Mail errado!');
                res.redirect("/pescaaki/login");
            }
        }).catch((erro) => {
            res.send('Houve um erro: ' + erro);
        });
});

router.get('/cadastro', (req, res) => {
    res.render("admin/cadastro", {layout: 'ini'});
});

router.post('/cadastro/usuario', (req, res) =>{
    Usuario.create({
        cpf:req.body.cpf,
        nome:req.body.nome,
        telefone:req.body.telefone,
        email:req.body.email,
        senha:req.body.senha
    }).then(() =>{
        res.redirect("/pescaaki/login");
    }).catch((erro) =>{
        res.send('Houve um erro: '+erro);
    });
});

module.exports = router;