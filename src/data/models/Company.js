import DataType from 'sequelize';
import Model from '../sequelize';

export const Company = Model.define('Company', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataType.STRING,
        primaryKey: false,
        autoIncrement: false,
    },
    isCompany: {
        type: DataType.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false
    },
    status: {
        type: DataType.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        unique: false,
        defaultValue: 'pending'
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    },
    address: {
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    },
    phone: {
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    },
    // line: {
    //     type: DataType.STRING,
    //     allowNull: true,
    //     unique: false,
    // },
});