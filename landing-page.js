/* Random Öl */

const randomBeerUrl = "https://api.punkapi.com/v2/beers/random";
const randomBtn = document.getElementById('random-btn');
const randomImage = document.getElementById('random-image');
const randomHeaderElement = document.getElementById('random-header');
const articleTag = document.getElementById('random-article');
let randomBeerId;

randomBtn.addEventListener('click', () => {
    getData(randomBeerUrl, createBeerCard);
});

function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {

        callback(data);
    })
    .catch(error => console.log(error));
}

function createBeerCard(data) {
    
    let randomBeer = data[0];
    randomBeerId = randomBeer.id;

    randomImage.src = randomBeer.image_url;
    randomImage.alt = "Bild på en öl.";
    randomHeaderElement.innerText = randomBeer.name;
    const openInfoBtn = document.createElement("button");
    openInfoBtn.addEventListener('click', () => {
        openBeerInfo();
    });
    
    openInfoBtn.innerText = "Visa mer";
    articleTag.removeChild(articleTag.lastChild);
    articleTag.appendChild(openInfoBtn);
}

function openBeerInfo() {
    const url = `beer-info.html?name=${randomBeerId}`;
    window.open(url);
}