const API_KEY = "2a2002d67a5d9d1142d54dced9111ca7";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


// datayi fetch ile yakaliyoruz, asenkron bir fonksiyon ile

async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
}


function displayMovies(movies) {
    main.innerHTML = ""; 

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        // Create movie card
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// color rating
function getClassByRating(vote) {
    if (vote >= 8) return "green";
    if (vote >= 5) return "orange";
    return "red";
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(`${SEARCH_URL}${searchTerm}`);
        search.value = ""; // search bar temizligi
    }
});


getMovies(API_URL);



