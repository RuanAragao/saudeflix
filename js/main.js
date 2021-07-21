// Lista de videos e suas categorias
const movies = {
  "featured": "Procedimentos de Enfermagem",

  "Procedimentos de Enfermagem": [
    "pnXggmSjhxw",
    "mNzaZd-6r94",
    "bDfDvhCeYAU",
    "bQOKsjoFBPI"
  ],
  "Anatomia": [
    "5c3Pp-b7uwc",
    "CKgzFFgBsGw",
    "EomqdYxppY4"
  ]
}

const featuredId = movies[movies.featured][2];

// Função que retorna dados do vídeo
const movieData = {
  cover(id, resolution = "maxresdefault") {
    return `https://img.youtube.com/vi/${id}/${resolution}.jpg` // ou /0.jpg
  },
  url(id) {
    return `https://www.youtube.com/watch?v=${id}`
  }
}

// Configura o vídeo de destaque
const featuredChange = function () {
  const featuredMovie = document.getElementById("featuredMovie");
  featuredMovie.style.backgroundImage = `linear-gradient(180deg,rgba(20,20,20,0) 50%,var(--brand-black)100%), linear-gradient(90deg,rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%), url(${movieData.cover(featuredId)})`;
}

// Pega a lista de keys excluindo o primeiro, que é o destaque.
const keysCategoriesFeed = Object.keys(movies).slice(1);


const feed = document.getElementById("feed");

const makeCarousel = function () {
  feed.innerHTML = `
  <div class="carousel-movies">
    <h3 class="title-section">Procedimentos de Enfermagem</h3>
    <div class="owl-carousel owl-theme">
      <div class="item">
        <img src="sample/thumb-movie.jpg" alt="Movie Alt" class="thumb-movie">
      </div>
    </div>
  </div>
  `
}

// Monta a lista
let divCarouselMovies, h3TitleSection, divOwlCarousel;
let divItem, imgItem;

keysCategoriesFeed.map((category, index) => {
  console.log("Category: " + category, index)

  divCarouselMovies = document.createElement('div');
  divCarouselMovies.className = 'carousel-movies';
  h3TitleSection = document.createElement('h3');
  h3TitleSection.className = 'title-section';
  h3TitleSection.innerText = category;
  divCarouselMovies.appendChild(h3TitleSection);

  divOwlCarousel = document.createElement('div');
  divOwlCarousel.className = 'owl-carousel owl-theme';
  divOwlCarousel.id = `category-${index}`;


  // feed.appendChild(`
  // <div class="carousel-movies">
  //   <h3 class="title-section">${category}</h3>
  //   <div class="owl-carousel owl-theme" id="category-${index}">

  //   </div>
  // </div>
  // `);

  let categoryCarousel = document.getElementById(`category-${index}`);
  movies[category].map(movie => {

    divItem = document.createElement('div');
    divItem.className = 'item';

    imgItem = document.createElement('img');
    imgItem.className = 'thumb-movie';
    imgItem.src = movieData.cover(movie, 0);
    divItem.appendChild(imgItem);

    divOwlCarousel.appendChild(divItem);


    // console.log("Movie: " + movie)
    // categoryCarousel.appendChild(`
    //   <div class="item">
    //     <img src="${movieData.cover(movie, 0)}" alt="Video" class="thumb-movie">
    //   </div>
    // `)
  })

  divCarouselMovies.appendChild(divOwlCarousel);
  feed.appendChild(divCarouselMovies);
})


// Chama funções

featuredChange();