const PokemonCtrl = {};
const axios = require('axios');

PokemonCtrl.get=(req,res) => {
    const imageType = req.query.imageType == undefined ? 'front_default' : req.query.imageType;

    console.log(req.query.name != undefined)
    console.log(imageType)

    if (req.query.name != undefined && (imageType == 'front_default' || imageType == 'front_shiny')) {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}/`)
            .then(obj => {
                res.send(obj.data.sprites[imageType]).end();
            })
            .catch(error => {
                res.status(error.response.status).send(error.response.statusText).end;
            });
    }
    else {
        res.status(400).send('Bad request').end;
    }

};

module.exports = PokemonCtrl;
