/** CARROUSSEL HEADER **/

var slides = document.querySelectorAll('.slide .slide2');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 3500);

function nextSlide() {
  slides[currentSlide].className = 'slide2';
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = 'slide1';
}

/** AFFICHAGE FILMS AVEC LISTE DATA.JS: VIGNETTES + TITRES **/

var toto = document.getElementById('toto');
toto.innerHTML = '';
toto.style.color = '#FFF';

for (var i = 0; i < data.films.length; i++) {
  var img = data.films[i].img;
  var title = data.films[i].title;
  var cat = data.films[i].category;
  var html = '<div class="film cat-Tous cat-' + cat + '">';
  html += '<img src="' + img + '">' + ' ' + '<h3 class ="hey">' + title + '</h3>';
  html += '</div>';
  toto.innerHTML += html;
}

var la = document.querySelectorAll('.hey');

for (var i = 0; i < la.length; i++) {
  la[i].style.margin = "40" + "px";
}

/** FILTRE PAR CATEGORIE **/

var filters = document.querySelectorAll('.categorie');
var films = document.querySelectorAll('.film');
for (let i = 0; i < filters.length; i++)

  filters[i].addEventListener('click', function() {
    for (let a = 0; a < films.length; a++) {
      if (films[a].classList.contains('cat-' + filters[i].textContent)) {
        films[a].style.display = '';
      } else {
        films[a].style.display = 'none';
      }
    }
  });

/** MODAL **/

let btn = document.querySelectorAll('.cat-Tous');
let overlay = document.querySelector('.modal_overlay');
let modal = document.querySelector('.modal');
let modalTitre = document.querySelector('.titreMo');
let describ = document.querySelector('.modalDescription');
let posModal = 0;

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function() {
    let title = document.querySelector('.modal h4');
    let player = document.querySelector('.modal .modal_player');
    var video = document.getElementById("video_player_box");
    modal.style.display = 'block';
    for (var a = 0; a < data.films.length; a++) {
      var compar = btn[i].querySelector(".hey");
      if (compar.textContent === data.films[a].title) {
        modalTitre.textContent = data.films[a].title;
        video.innerHTML = '<video id="my_video" width="85%" autoplay>' +
          '<source class="sourceVideo" src="'+ data.films[a].src +'" type="video/mp4">' +
          '</video>' +
          '<div class="video_controls_bar_color" id="video_controls_bar">' +
          '<div class="element1">' +
          '<button class="playpausebtn" id="playpausebtn"></button>' +
          '</div>' +
          '<div class="element7">' +
          '<button class="stopbtn" id="stopbtn"></button>' +
          '</div>' +
          '<div class="element2">' +
          '<input class="seekslider" id="seekslider" type="range" min="0" max="100" value="0" step="1" style="width:350px;">' +
          '</div>' +
          '<div class="element3">' +
          '<span class="currentTime" id="currentTime">00:00</span>' +
          '<span class="barre"> / </span>' +
          '<span class="durentTime" id="durentTime">00:00</span>' +
          '</div>' +
          '<div class="element4">' +
          '<button class="mutebtn" id="mutebtn"></button>' +
          '</div>' +
          '<div class="element5">' +
          '<input class="volumeslider" id="volumeslider" type="range" min="0" max="100" value="100" step="1" style="width:80px;">' +
          '</div>' +
          '<div class="element6">' +
          '<button class="fullscreenbtn" id="fullscreen"></button>' +
          '</div>' +

          '</div>';
        initializePlayer();
        describ.innerHTML = '<a class="lienYoutube" target="_blank" href=' + data.films[a].author_url + '>' + '<h3 class="videoAuthor">' + data.films[a].author + '</h3>' + '</a>' +
          '<div class="flexo"><p class="annee">' + data.films[a].year + '</p>' + '<p class="duree">' + data.films[a].duration + '</p></div>' +
          '<p class="cate">' + data.films[a].category + '</p>' +
          '<p class="videoDescription">' + data.films[a].description + '</p>';

        let author = document.querySelector('.videoAuthor')
        author.addEventListener('click', function() {
          author.href = data.films[i].author_url;
        });
      }
    }
  })
}

document.querySelector('.modal_overlay').addEventListener('click', function() {
  modal.style.display = '';
  var video = document.getElementById("video_player_box");
  video.innerHTML = "";
})


/** MODAL : LECTEUR **/

var video, playbtn, seekslider, currentTime, durentTime, mutebtn, volumeslider, userVolume, fullscreen, beforeVolume, stopbtn;

function initializePlayer() {
  //je reference l'objet
  video = document.getElementById("my_video");
  playbtn = document.getElementById("playpausebtn");
  seekslider = document.getElementById("seekslider");
  currentTime = document.getElementById("currentTime");
  durentTime = document.getElementById("durentTime");
  mutebtn = document.getElementById("mutebtn");
  volumeslider = document.getElementById("volumeslider");
  fullscreen = document.getElementById("fullscreen");
  stopbtn = document.getElementById("stopbtn");

  // j'ajoute un event
  playbtn.addEventListener("click", playPause, false);
  seekslider.addEventListener("change", vidSeek, false);
  video.addEventListener("timeupdate", seektimeupdate, false);
  mutebtn.addEventListener("click", vidmute, false);
  volumeslider.addEventListener("change", setvolume, false);
  fullscreen.addEventListener("click", toggleFullScreen, false);
  stopbtn.addEventListener("click", vidstop, false);
}


function vidSeek()  {
  var seekto = video.duration * (seekslider.value / 100);
  video.currentTime = seekto;
}

function seektimeupdate() {
  var nt = video.currentTime * (100 / video.duration);
  seekslider.value = nt;

  var curmins = Math.floor(video.currentTime / 60);
  var cursecs = Math.floor(video.currentTime - curmins * 60);
  var durmins = Math.floor(video.duration / 60);
  var dursecs = Math.floor(video.duration - durmins * 60);
  if (cursecs < 10) {
    cursecs = "0" + cursecs;
  }
  if (dursecs < 10) {
    dursecs = "0" + cursecs;
  }
  if (curmins < 10) {
    curmins = "0" + curmins;
  }
  if (durmins < 10) {
    durmins = "0" + durmins;
  }
  currentTime.innerHTML = curmins + ":" + cursecs;
  durentTime.innerHTML = durmins + ":" + dursecs;

}

function playPause() {
  if (video.paused) {
    video.play();
    playbtn.style.background = "url(img/Pause.png) no-repeat center";
  } else {
    video.pause();
    playbtn.style.background = "url(img/Play.png) no-repeat center";

  }
}

function vidstop() {
  playPause();
  video.currentTime = 0;
  seekslider.value = 0;

}




function vidmute() {
  if (video.muted) {
    video.muted = false;
    volumeslider.value = beforeVolume;
    mutebtn.style.background = "url(img/sound.png) no-repeat center";
  } else {
    beforeVolume = volumeslider.value;
    video.muted = true;
    volumeslider.value = 0;
    mutebtn.style.background = "url(img/nosound.png) no-repeat center";

  }
}

function setvolume() {
  video.volume = volumeslider.value / 100;
}

function toggleFullScreen() {
  if (video.requestFullScreen) {
    video.requestFullScreen();

  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
  } else if (vid.webkitRequestFullScreen) {
    video.mozRequestFullScreen();

  }
}

/** BARRE DE RECHERCHE **/
var cherche = document.querySelector(".search");
cherche.addEventListener("input", function(els) {
  if (els.srcElement.value !== '') {
    toto.innerHTML = '';
    for (var i = 0; i < data.films.length; i++) {
      if (data.films[i].title.toUpperCase().indexOf(els.srcElement.value.toUpperCase()) > -1) {
        var img = data.films[i].img;
        var title = data.films[i].title;
        var cat = data.films[i].category;
        var html = '<div class="film cat-Tous cat-' + cat + '">';
        html += '<img src="' + img + '">' + ' ' + '<h3 class ="hey">' + title + '</h3>';
        html += '</div>';
        toto.innerHTML += html;
      }
    }

    if (toto.innerHTML == '') {
      toto.innerHTML = 'Aucun film ne correspond à votre recherche.';
    }
  } else {
    toto.innerHTML = '';
    for (var i = 0; i < data.films.length; i++) {
      var img = data.films[i].img;
      var title = data.films[i].title;
      var cat = data.films[i].category;
      var html = '<div class="film cat-Tous cat-' + cat + '">';
      html += '<img src="' + img + '">' + ' ' + '<h3 class ="hey">' + title + '</h3>';
      html += '</div>';
      toto.innerHTML += html;
    }
  }
});
