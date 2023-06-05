const db = require('./db');
const Reserva = db.sequelize.define('reserva', {
    id_reserva:{
        type:db.Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    fk_usuario:{
        type:db.Sequelize.INTEGER,
        references:{ model:'Usuario', key:'id_usuario'},
        onDelete:'CASCADE',
        allowNull:false,
    },
    fk_pesqueiro:{
        type:db.Sequelize.INTEGER,
        references:{ model:'Pesqueiro', key:'id_pesqueiro'},
        onDelete:'CASCADE',
        allowNull:false,
    },
    rstatus:{
        type:db.Sequelize.INTEGER
    },
    data:{
        type:db.Sequelize.STRING(10)
    },
    tempo:{
        type:db.Sequelize.STRING(8)
    },
    pagamento:{
        type:db.Sequelize.STRING(50)
    },
}, { freezeTableName:true});

//Reserva.sync({force:true});

module.exports = Reserva;