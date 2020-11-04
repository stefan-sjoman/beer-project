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
    let keysArray = ["Description: ", "Hops: ", "Alcohol per volume: ", "Volume: ", "Ingredients: ", "Brewers tips: ", "Food pairing: "]
    let hops = beer.ingredients.hops.name//här var vi
    let valuesArray = [beer.description, beer.ingredients.hops, beer.abv, beer.volume, beer.ingredients, beer.brewers_tips, beer.food_pairing];
    valuesArray.forEach((item, index) => {console.log(item)
        let newLi = document.createElement('li');
        newLi.textContent = keysArray[index] + item;
        infoList.appendChild(newLi);
    })

    const name = beer.name;
    infoHeader.textContent = name;


    
}


// Image
// Hops
// Food pairing