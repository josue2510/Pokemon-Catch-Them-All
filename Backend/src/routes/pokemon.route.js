const {Router} = require('express');
const route = Router();
const PokemonCtrl = require('../controllers/pokemon.controller');

route.get('/pokemons', PokemonCtrl.get);

module.exports = route;
