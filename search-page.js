
const searchUrl = 'https://api.punkapi.com/v2/beers';
const formElement = document.querySelector('form');
const forwardButton = document.createElement('button');
const backButton = document.createElement('button');
const pageDisplay = document.createElement('span');
const navElement = document.querySelector('nav');
let searchStr = "";
let pageNumber = 1;
let pageExists;
let cachePages = [];

formElement.addEventListener('submit', search);

function search(evt) {

    cachePages = [];

    searchStr = evt.target[0].value;

    changePage();

    evt.preventDefault();
}

function changePage(){
    
    const url = `${searchUrl}?beer_name=${searchStr}&page=${pageNumber}&per_page=10`;
    getData(url, checkData);   
}

function checkData(data) {

    if (data.length === 0) {
        pageExists = false;
    }
    else {
        pageExists = true;
    }
}

function getData(url, callback) {
    fetch(url)
    .then(res => res.json())
    .then(data => {

        console.log(data);
       
        callback(data);

        if (pageExists === true) {
            render(data);
        }
        else {
            alert("Finns ingen data");
            pageNumber--; // To cancel-out counting in goForward();
        }
    })
    .catch(error => console.log(error));
}

function render(data) {
    
    const ulTag = document.querySelector('ul');

    ulTag.innerText = "";
    ulTag.addEventListener('click', openBeerInfo);
    
    data.forEach((item) => {
        const liTag = document.createElement('li');
        liTag.textContent = item.name;
        liTag.setAttribute('name', item.id);
        ulTag.appendChild(liTag);
    });
    createNavButtons();
    cachePages.push(data);
}

function openBeerInfo(evt) {

    const beerId = evt.target.getAttribute('name');
    const url = `beer-info.html?name=${beerId}`;
    document.location.href = url;
}

function createNavButtons() {

    forwardButton.textContent='►';
    forwardButton.addEventListener('click', goForward);
    backButton.textContent='◄';
    backButton.addEventListener('click', goBack);

    pageDisplay.textContent = pageNumber;
    
    navElement.appendChild(backButton);
    navElement.appendChild(pageDisplay);
    navElement.appendChild(forwardButton);
}

function goForward(){

    pageNumber++;
    changePage();
}

function goBack(){

    if (pageNumber > 1 ) {
        pageNumber--;
        render(cachePages[pageNumber - 1]);
    }
}