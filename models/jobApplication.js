const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const JobApplication = sequelize.define('JobApplication', {
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    applicationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    lastEdited: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

sequelize.sync();

module.exports = JobApplication;
