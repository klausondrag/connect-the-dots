let env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const
    knex = require('knex');
knexfile = require('./knexfile');
bookshelf = require('bookshelf')(knex(knexfile[env]));

console.log("load knexfile environment:",env)
module.exports = bookshelf;