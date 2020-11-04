const searchParams = new URLSearchParams(window.location.search);
const api = 'https://api.punkapi.com/v2/beers';
const id = searchParams.get('name');
const url = `${api}/${id}`;
const mainElement = document.querySelector('main');
const infoList = document.getElementById('info-list');
const infoHeader = document.querySelector('h1');

const image = document.querySelector('img');


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
    console.log(beer);
    const name = beer.name;
    const hopsString = getHopsName(beer.ingredients.hops);

    let keysArray = ["Description: ", "Hops: ", "Alcohol by volume: ", "Volume: ", "Ingredients: ", "Brewers tips: ", "Food pairing: "];
    let valuesArray = [beer.description, hopsString, beer.abv, beer.volume, beer.ingredients, beer.brewers_tips, beer.food_pairing];
    
    infoHeader.textContent = name;

    valuesArray.forEach((item, index) => {
    let newLi = document.createElement('li');
    newLi.textContent = keysArray[index] + item;
    infoList.appendChild(newLi);
    });
}

function getHopsName(hops) {

    let hopsName = "";

    hops.forEach((item) => {
        hopsName += item.name + ", ";
    });
    console.log(hops);
    console.log(hopsName);

    return hopsName;
}

// function getABV()