const db = require('./db');
const Pesqueiro = db.sequelize.define('pesqueiro', {
    id_pesqueiro:{
        type:db.Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nome_pesq:{
        type:db.Sequelize.STRING
    },
    telefone:{
        type:db.Sequelize.STRING(11)
    },
    email:{
        type:db.Sequelize.STRING
    },
    descricao:{
        type:db.Sequelize.STRING
    },
    imagem:{
        type:db.Sequelize.STRING
    },
}, { freezeTableName:true});

//Pesqueiro.sync({force:true});

module.exports = Pesqueiro;