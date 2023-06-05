const express = require('express');
const Pesqueiro = require('../models/Pesqueiro');
const Reserva = require('../models/Reserva');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.get('/reservar/:id', (req, res) => {
    Pesqueiro.findAll({ where: { 'id_pesqueiro': req.params.id } }).then((pesqueiros) => {
        pesqueiros = pesqueiros.map((pesqueiro) => {
            return pesqueiro.toJSON()
        });
        res.render("admin/pescador/reservar", { pesqueiros: pesqueiros });
    });
});

router.post('/reservar/criar/:id', (req, res) => {
    Usuario.findOne({ where: { 'email': req.session.email } }).then((usuario) => {
        var usu = JSON.parse(JSON.stringify(usuario));
        req.session.email = usu.email;
        Reserva.create({
            fk_usuario: usu.id_usuario,
            fk_pesqueiro: req.params.id,
            data: req.body.data,
            tempo: req.body.tempo,
            pagamento: req.body.pagamento
        }).then(() => {
            res.redirect("/pescaaki/feed");
        }).catch((erro) => {
            res.send('Houve um erro: ' + erro);
        });
    });
});


router.get('/agendadas', (req, res) => {
    Usuario.findOne({ where: { 'email': req.session.email } }).then((usuario) => {
        var usu = JSON.parse(JSON.stringify(usuario));
        req.session.email = usu.email;
        Reserva.sequelize.query("select * from Agendamentos where cpf = '"+usu.cpf+"'", { model: Reserva}).then((agendamentos) => {
            var nagendamentos = JSON.parse(JSON.stringify(agendamentos));
            res.render("admin/pescador/agendamentos", { agendamentos: nagendamentos });
        });
    });
});


router.get('/agendadas/cancelar/:id', (req, res) => {
    Reserva.update({
        rstatus: 0 },
        {
            where: { id_reserva : req.params.id }
        }).then(() => {
            res.redirect("/pescaaki/agendadas");
        }).catch((erro) => {
            res.send("Este reserva não existe " + erro);
        });
});

module.exports = router;