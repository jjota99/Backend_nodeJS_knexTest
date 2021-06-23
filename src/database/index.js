const knexfille = require("../../knexfile.js");
const knex = require("knex")(knexfille.development)

module.exports = knex;