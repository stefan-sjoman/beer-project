const searchParams = new URLSearchParams(window.location.search);
const api = 'https://api.punkapi.com/v2/beers';
const id = searchParams.get('name');
const url = `${api}/${id}`;
const mainElement = document.querySelector('main');
const infoList = document.getElementById('info-list');
const infoHeader= document.querySelector('h1');
const newLi = document.createElement('li');
const image= document.querySelector('img');


getData(url, render);

function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {

        callback(data);
    })
    .catch(error => console.log(error));
}

function render(data) {
    
    const beer = data[0];
    let infoArray=[beer.description, beer.abv, beer.volume, beer.ingredients, beer.brewers_tips];
    infoArray.forEach((item, index)=>{newLi.textContent = item[index]})//Här var vi
    const name = beer.name;
    infoHeader.textContent = name;
    
    infoList.appendChild(newLi);
    console.log(beer)
}


// Image
// Hops
// Food pairing
