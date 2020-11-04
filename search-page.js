
const searchUrl = 'https://api.punkapi.com/v2/beers';
const formElement = document.querySelector('form');

formElement.addEventListener('submit', search);

function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {

        callback(data);
    })
    .catch(error => console.log(error));
}

function search(evt) {

    const searchStr = evt.target[0].value;

    const url = `${searchUrl}?beer_name=${searchStr}&page=1&per_page=10`;

    getData(url, render);    
    evt.preventDefault();
}

function render(data) {

    const ulTag = document.querySelector('ul');
    ulTag.addEventListener('click', openBeerInfo);

    data.forEach((item, index) => {
        const liTag = document.createElement('li');
        liTag.textContent = item.name;
        liTag.setAttribute('name', item.id);
        ulTag.appendChild(liTag);
    });

    console.log(data);
}

function openBeerInfo(evt) {
    const beerId = evt.target.getAttribute('name');
    const url = `beer-info.html?name=${beerId}`;
    document.location.href = url;
}