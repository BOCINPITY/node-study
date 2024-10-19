const Book = require("../models/Book")
const {Op} = require("sequelize");


exports.addBook = async function (bookObj){
    const ins =  await Book.create(bookObj)
    return ins.toJSON()
}

exports.delBook = async function (bookId){
    await Book.destroy({
        where:{
            id:bookId
        }
    })
}

exports.updateBook = async function (bookId,bookObj){
    const ins = await Book.findByPk(bookId)
    return await ins.update(bookObj)
}



exports.getBookById = async function(bookId){
    const result = await Book.findByPk(bookId)
    return result ? result.toJSON() : null
}

exports.getBooks = async function (page = 1, limit = 10, author='', name = '') {

    const condition = {}
    if (name) condition.name = {
        [Op.like]:`%${name}%`
    }
    if(author) condition.author = {
        [Op.like]:`%${author}%`
    }


    const results = await Book.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
        where: {
            [Op.or]:condition
        }
    });
    return {
        students: JSON.stringify(results),
        total: results.count
    }
}
