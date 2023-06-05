const express = require('express');
const Pesqueiro = require('../models/Pesqueiro');
const router = express.Router();

router.get('/feed', (req, res) => {
    Pesqueiro.findAll().then((pesqueiros) => {
        pesqueiros = pesqueiros.map((pesqueiro) => {
            return pesqueiro.toJSON();
        });
        res.render("admin/pescador/feed", { pesqueiros: pesqueiros });
    });
});

router.get('/pesqueiro/:id', (req, res) => {
    Pesqueiro.findAll({ where: { 'id_pesqueiro': req.params.id } }).then((pesqueiros) => {
    pesqueiros = pesqueiros.map((pesqueiro) => {
        return pesqueiro.toJSON()
    });
    res.render("admin/pescador/pesqueiro", { pesqueiros: pesqueiros });
    });
});

router.get('/pesqueiro', (req, res) => {
    res.render("admin/pescador/cpesqueiro");
});

router.post('/pesqueiro/cadastro', (req, res) => {
    Pesqueiro.create({
        nome_pesq: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        descricao: req.body.descricao,
        imagem: req.body.imagem

    }).then(() => {
        res.redirect("/pescaaki/pesqueiro");
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro);
    });
});

module.exports = router;