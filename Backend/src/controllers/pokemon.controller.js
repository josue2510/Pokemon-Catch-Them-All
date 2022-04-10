const PokemonCtrl = {};
const axios = require('axios');
const Fs = require('fs');

PokemonCtrl.getPokemonImage = (req,res) => {
    const imageType = req.query.imageType == undefined ? 'front_default' : req.query.imageType;

    if (req.query.name != undefined && (imageType == 'front_default' || imageType == 'front_shiny')) {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}/`)
            .then(async obj => {
                const imageURL = obj.data.sprites[imageType];
                const imageFileName = `${req.query.name}_${imageType}.png`;
                const imagePath = `C:/Pokemon-Catch-Them-All/Backend/downloads/${imageFileName}`;
            
                if (!Fs.existsSync(`./downloads/${imageFileName}`)) {
                    await downloadImage(imageURL, imageFileName);
                };

                res.sendFile(imagePath);
            })
            .catch(error => {
                res.status(404).send('Not found').end;
            });
    }
    else {
        res.status(400).send('Bad request').end;
    }
};

PokemonCtrl.getImageStatus = (req,res)=> {
    var imageStatus;
    const imageShiny = `${req.params.pokemon}_front_shiny.png`;
    const imageDefault = `${req.params.pokemon}_front_default.png`;

    if (Fs.existsSync(`./downloads/${imageShiny}`) || Fs.existsSync(`./downloads/${imageDefault}`)) {
        imageStatus = {status: 'cache'};
    } else {
        imageStatus = {status: 'unknown'};
    }

    res.send(imageStatus);
}

async function downloadImage(url, fileName) {
    const writer = Fs.createWriteStream(`./downloads/${fileName}`);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
  
    response.data.pipe(writer);
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    });
}

module.exports = PokemonCtrl;
