const {Router} = require('express');
const route = Router();
const PokemonCtrl = require('../controllers/pokemon.controller');

route.get('/pokemons', PokemonCtrl.getPokemonImage);
route.get('/pokemon/:pokemon/status', PokemonCtrl.getImageStatus);

module.exports = route;
