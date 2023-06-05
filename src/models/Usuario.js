const db = require('./db');
const Usuario = db.sequelize.define('usuario', {
    id_usuario:{
        type:db.Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    cpf:{
        type:db.Sequelize.STRING(11)
    },
    nome:{
        type:db.Sequelize.STRING
    },
    telefone:{
        type:db.Sequelize.STRING(11)
    },
    email:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING(50)
    }
}, { freezeTableName:true});

//Usuario.sync({force:true});

module.exports = Usuario;