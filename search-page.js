
const searchUrl = 'https://api.punkapi.com/v2/beers';
const formElement = document.querySelector('form');
const forwardButton = document.createElement('button');
const backButton = document.createElement('button');
const pageDisplay = document.createElement('span');
const navElement = document.querySelector('nav');
let pageNumber = 1;
let pageExists;
let cachePages = [];

let searchStr = "";
let searchStrHops ="";
let searchStrMalt ="";
let searchStrBrewedBefore ="";
let searchStrBrewedAfter = "";
let searchStrAbvGreater ="";
let searchStrAbvLess ="";


function validate() {

    if (
        checkIfNumber(searchStrAbvLess) &&
        checkIfNumber(searchStrAbvGreater) &&
        checkIfNumber(searchStrBrewedBefore) &&
        checkIfNumber(searchStrBrewedAfter) &&
        compare(searchStrAbvGreater, searchStrAbvLess) &&
        compare(searchStrBrewedBefore, searchStrBrewedAfter)
    ) {
        alert("jippie")
    } else {
        alert("nääjj")
    }
}

function checkIfNumber(value) {
    if (value.length == 0) {
        return true
    } else if (isNaN(value) || value < 1) {
        alert("Skriv in en siffra");
        return false
    } else {
        return true;
    }
}


function compare(value1, value2) {
    if (value1.length == 0 || value2.length == 0) {
        return true
    } else if (value1 <= value2) {
        return true
    } else {
        alert("Du har skrivit in värdena i fel ordning"); //Det här behöver fixas så att jag kan hämta label eller nåt och säga vilket fält som ska vara lägre
        return false
    };
}

formElement.addEventListener('submit', search);

function search(evt) {

    pageNumber = 1;

    cachePages = [];

    searchStr = evt.target[0].value;
    searchStrHops = evt.target[1].value;
    searchStrMalt = evt.target[2].value;
    searchStrBrewedBefore = evt.target[3].value;
    searchStrBrewedAfter = evt.target[4].value
    searchStrAbvGreater = evt.target[5].value;
    searchStrAbvLess = evt.target[6].value;

    validate()
    // Här tror jag att det blir if validate()=true changePage() men har ej tänkt klart
    changePage();

    evt.preventDefault();
}

function changePage(){

    let beerNameSearch = "";
    if (searchStr !== "") {
        beerNameSearch = `&beer_name=${searchStr}`;
    }
    let hopsSearch = "";
    if (searchStrHops !== "") {
        hopsSearch = `&hops=${searchStrHops}`;
    }
    let maltSearch = "";
    if (searchStrMalt !== "") {
        maltSearch = `&malt=${searchStrMalt}`;
    }
    let brewedBefore = "";
    if (searchStrBrewedBefore !== "") {
        brewedBefore = `&brewed_before=${searchStrBrewedBefore}`;
    }
    let brewedAfter = "";
    if (searchStrBrewedAfter !== "") {
        brewedAfter = `&brewed_after=${searchStrBrewedAfter}`;
    }
    let abvGreater = "";
    if (searchStrAbvGreater !== "") {
        abvGreater = `&abv_gt=${searchStrAbvGreater}`;
    }
    let abvLess = "";
    if (searchStrAbvLess !== "") {
        abvLess = `&abv_lt=${searchStrAbvLess}`;
    }

    const url = `${searchUrl}?&page=${pageNumber}&per_page=10${beerNameSearch}${hopsSearch}${maltSearch}${brewedBefore}${brewedAfter}${abvGreater}${abvLess}`;
    console.log(url);
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