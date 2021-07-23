// Lista de videos e suas categorias
const movies = {
  "featured": "Anatomia",

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
  ],
  "Atendimento Pré-Hospitalar": [
    "jhGvxSolN7k",
    "v1GlE9UzMYg",
    "D39psjudLGI",
    "S2_EU1T-o-g",
    "lhSsztkQnAA"
  ]
}

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
// const featuredId = movies[movies.featured][2];
const BtnFeaturedMoviePlay = document.getElementById("BtnFeaturedMoviePlay"); // Botão para assitir vídeo em desstaque 
const featuredMovie = document.getElementById("featuredMovie");
const featuredChange = function () {
  const min = Math.ceil(0);
  const max = Math.floor(movies[movies.featured].length);
  const indM = Math.floor(Math.random() * (max - min)) + min;
  const featuredId = movies[movies.featured][indM];

  // Evento para reproduzir o vídeo em destaque ao pressionar o botão
  BtnFeaturedMoviePlay.addEventListener("click", () => loadMovie(featuredId), false);

  // Exibe a capa do vídeo
  featuredMovie.style.backgroundImage = `linear-gradient(180deg,rgba(20,20,20,0) 50%,var(--brand-black)100%), linear-gradient(90deg,rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%), url(${movieData.cover(featuredId)})`;
}


// Pega a lista de keys excluindo o primeiro, que é o destaque.
const keysCategoriesFeed = Object.keys(movies).slice(1);


const feed = document.getElementById("feed");

// Monta a lista
let divCarouselMovies, h3TitleSection, divOwlCarousel;
let divItem, linkItem, imgItem;

keysCategoriesFeed.map((category, index) => {
  console.log("Category: " + category, index)

  // <div class="carousel-movies">
  divCarouselMovies = document.createElement('div');
  divCarouselMovies.className = 'carousel-movies';

  //   <h3 class="title-section">${category}</h3>
  h3TitleSection = document.createElement('h3');
  h3TitleSection.className = 'title-section';
  h3TitleSection.innerText = category;
  divCarouselMovies.appendChild(h3TitleSection);

  //   <div class="owl-carousel owl-theme" id="category-${index}">
  divOwlCarousel = document.createElement('div');
  divOwlCarousel.className = 'owl-carousel owl-theme';
  divOwlCarousel.id = `category-${index}`;


  // <div class="carousel-movies">
  //   <h3 class="title-section">${category}</h3>
  //   <div class="owl-carousel owl-theme" id="category-${index}">

  //   </div>
  // </div>

  let categoryCarousel = document.getElementById(`category-${index}`);
  movies[category].map(movie => {

    //   <div class="item">
    divItem = document.createElement('div');
    divItem.className = 'item';

    // <a href="#" id="" class="link-movie">
    linkItem = document.createElement('a');
    linkItem.className = 'link-movie';
    linkItem.id = movie;
    linkItem.href = `#${movie}`;
    linkItem.dataset.movie = movie;

    //     <img src="${movieData.cover(movie, 0)}" alt="Video" class="thumb-movie">
    imgItem = document.createElement('img');
    imgItem.className = 'thumb-movie';
    imgItem.dataset.movie = movie;
    imgItem.src = movieData.cover(movie, "mqdefault");
    linkItem.appendChild(imgItem);

    divItem.appendChild(linkItem);
    divOwlCarousel.appendChild(divItem);


    //   <div class="item">
    //     <img src="${movieData.cover(movie, 0)}" alt="Video" class="thumb-movie">
    //   </div>
  })

  divCarouselMovies.appendChild(divOwlCarousel);
  feed.appendChild(divCarouselMovies);
})


// Chama função que monta o víde em destaque
featuredChange();

// window.addEventListener('load', function () { alert() }, false);

const playerScreen = document.getElementById('player');
const playerFrame = document.getElementById('ytplayer');
const btnBack = document.getElementById('btnBack');

// Gerenciamento de visibilidade do player
// Registra o estado do player
let playerOn = false;

// Mostra player
function showPlayer() {
  if (!playerOn) {
    playerScreen.style.top = 0;
    document.body.style.overflow = "hidden";
    playerOn = true;
    return true;
  }
  return false;
}

// Oculta player
function hidePlayer() {
  if (playerOn) {
    playerScreen.style.top = "initial";
    document.body.style.overflow = "initial";
    playerOn = false;
    return true;
  }
  return false;
}

// Carrega o vídeo no player
function loadMovie(movieId) {
  // Monta a url do embed
  const mUrl = `https://www.youtube.com/embed/${movieId}?autoplay=1&controls=1&enablejsapi=0&modestbranding=1`;
  // Carrega a url no player
  playerFrame.src = mUrl;

  // Se o player está oculto, mostra.
  if (!playerOn) showPlayer();

  return true;
}

function exitMovie() {
  if (playerOn) {
    // Oculta o player
    hidePlayer();
    // limpar o frame
    playerFrame.src = "";
    return true;
  }

  return false;
}


function load() {
  const linksMovies = document.getElementsByClassName('link-movie');

  // Adiciona o evento para todos os vídeos listados
  Array.from(linksMovies).forEach(function (linkMovie) {
    linkMovie.addEventListener('click', event => {
      // Carrega o vídeo clicado
      loadMovie(event.target.getAttribute('data-movie'));
    });
  });

  // Evento para botão "Sair" do player
  btnBack.addEventListener('click', exitMovie, false);
}

// Chama função "load" após carregamento da DOM
document.addEventListener("DOMContentLoaded", load, false);

