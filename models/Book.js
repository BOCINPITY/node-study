const sequelize = require('./db')

const {DataTypes} = require("sequelize");

const Book = sequelize.define('Book', {
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
        allowNull:true,
    },
    publishDate:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    paranoid: true,
});

// Book.sync({alter: true}).then(r =>{})

module.exports = Book;