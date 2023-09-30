const accessKey = "D459cNSi-G1S4Ju53sQqzY7oXkd8DU_Ygxsvfe5fWWo"

const searchForm  = document.querySelector("form")

const searchInput = document.getElementById("Search-input")

const searchResults = document.querySelector(".search-results")

const showMore = document.querySelector("#show-more-button")

let inputData = ""
let page = 1;

 async function searchImages() {
    inputData = searchInput.value;
    //a/q to the inputData we have to search that keyword in unsplash . so we have to make a dynamic url to do so.
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);  //adter fetching olny next code will be executed . 
    const data = await response.json();

    const results = data.results;
    if(page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;   //immmmmm it should be urls , url will not work . 
        image.alt = result.alt_description; 
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html; 
        imageLink.target = "_blank" ;
        imageLink.textContent = result.alt_description; 

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });
    page++

    if(page > 1) {
        showMore.style.display = "block";
    }
    
 
}

searchForm.addEventListener("submit",(event) => {  //submit event on form so form selected 
    event.preventDefault();
    page = 1;
    searchImages();
});
showMore.addEventListener("click",() => {
    searchImages();
});