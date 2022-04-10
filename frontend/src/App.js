import { useState } from 'react';
import './App.css';

function App() {
  const [history] = useState([]);
  const [currentImage, setCurrentImage] = useState();
  const [pokemonName, setPokemonName] = useState(undefined);
  const [pokemonImageType, setPokemonImageType] = useState(undefined);
  const baseURL = "http://localhost:8080/api/v1/images/pokemons"

  const getImage = async () => {
    var fullURL = `${baseURL}?name=${pokemonName}&imageType=${pokemonImageType}`

    if (pokemonName === undefined) {
      fullURL = `${baseURL}?imageType=${pokemonImageType}`;
    } else if (pokemonImageType === undefined) {
      fullURL = `${baseURL}?name=${pokemonName}`
    } else if (pokemonImageType,pokemonName === undefined) {
      fullURL = baseURL;
    } 

    const res = await fetch(fullURL);

    if(res.status !== 200) {
      alert(res.status + ' ' + res.statusText);
    } else {
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setCurrentImage(imageObjectURL);
      history.push(imageObjectURL);
    }
  }

  const imageHistory = history.map(function(image){
    return (
      <li><img src={image} style={{width: 50, height: 50}}/></li>
    );
  });

  return (
    <div className="App">
      <div className='container col-md-2'>
        <div className="mb-3">
        <label for="inputPassword5" class="form-label">Pokemon Name</label>
        <input type="text" class="form-control" onChange={e=>setPokemonName(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label for="disabledSelect" className="form-label">Pokemon Image Type</label>
            <select className="form-select" onChange={e=>setPokemonImageType(e.target.value)}>
              <option selected></option>
              <option value='front_default'>default</option>
              <option value='front_shiny'>shiny</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={getImage} >Search</button>
      </div>
      <div className='container col-md-2 mt-2'>
          <img src={currentImage} style={{width: 200, height: 200}}></img>
      </div>
      <div className='container col-md-2 mt-2'>
        {imageHistory}
      </div>
    </div>
  );
}

export default App;
