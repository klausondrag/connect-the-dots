const Knex = require('knex');
const knex = Knex(require('../knexfile'));

function putIn() {
    return knex.raw("SELECT count(*) FROM  similarities where permid = 0")
        .then(c => {
            if (c <= 0) Promise.reject("Count is 0");
            return c
        })
        .then(selectUnMatched)
        .catch(err => console.error(err))
}

function selectUnMatched(c) {
    return knex.raw("SELECT FROM  similarities where permid = 0")
}

putIn();