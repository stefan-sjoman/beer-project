/* Random Öl */

const randomBeerUrl = "https://api.punkapi.com/v2/beers/random";
const randomBtn = document.getElementById('random-btn');
const randomImage = document.getElementById('random-image');
const randomHeaderElement = document.getElementById('random-header');
const randomInfo = document.getElementById('random-info');


randomBtn.addEventListener('click', () => {
    getData(randomBeerUrl, createBeerCard);
});

randomInfo.addEventListener('click', () => {
    openBeerInfo();
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
    console.log(randomBeer);
    console.log(data);

    randomImage.src = randomBeer.image_url;
    randomHeaderElement.innerText = randomBeer.name;
}

function openBeerInfo() {
    const url = "beer-info.html";
    document.location.href = url;
}