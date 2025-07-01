const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING(20),
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(20),
            defaultValue: 'user',
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, // Bật createdAt và updatedAt
        createdAt: 'created_at',  
        updatedAt: 'updated_at',
    }
);

module.exports = User;
