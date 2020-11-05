
const searchUrl = 'https://api.punkapi.com/v2/beers';
const formElement = document.querySelector('form');
const forwardButton = document.createElement('button');
const backButton = document.createElement('button');
const pageDisplay = document.createElement('span');
const navElement = document.querySelector('nav');
let searchStr = "";
let pageNumber = 1;
let pageExists;


formElement.addEventListener('submit', search);

function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {

        console.log(data);
        if (data.length === 0) {
            pageExists = false;
            return;
        }
        pageExists = true;
        callback(data);

    })
    .catch(error => console.log(error));
}

function render(data) {
    
    const ulTag = document.querySelector('ul');

    ulTag.innerText = "";
    ulTag.addEventListener('click', openBeerInfo);
    
    data.forEach((item, index) => {
        const liTag = document.createElement('li');
        liTag.textContent = item.name;
        liTag.setAttribute('name', item.id);
        ulTag.appendChild(liTag);
    });
    createNavButtons();
    console.log(data);
}

function search(evt) {

    searchStr = evt.target[0].value;

   // const url = `${searchUrl}?beer_name=${searchStr}&page=1&per_page=10`;
    const url = `${searchUrl}?beer_name=${searchStr}&page=${pageNumber}&per_page=10`;

    getData(url, render);    
    evt.preventDefault();
}

function changePage(){

    const url = `${searchUrl}?beer_name=${searchStr}&page=${pageNumber}&per_page=10`;
    getData(url, render); 
}

function openBeerInfo(evt) {
    const beerId = evt.target.getAttribute('name');
    const url = `beer-info.html?name=${beerId}`;
    document.location.href = url;
}

function goForward(){
    
    if (pageExists === true) {
        pageNumber++;
        changePage();
    }
}

function goBack(){

    if (pageNumber > 1 ) {
        pageNumber--;
        changePage();
    }
}

function createNavButtons(){
    forwardButton.textContent='►';
    forwardButton.addEventListener('click', goForward);
    backButton.textContent='◄';
    backButton.addEventListener('click', goBack);

    pageDisplay.textContent = pageNumber;
    
    navElement.appendChild(backButton);
    navElement.appendChild(pageDisplay);
    navElement.appendChild(forwardButton);
}