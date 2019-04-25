$(document).ready(function() {
  $('.sidenav').sidenav();
});
$('.dropdown-trigger').dropdown();
$(document).ready(function() {
  $('select').formSelect();
});


var showDogs = document.getElementById('showDogs')
if (window.location.href.match('dashboard.html') != null) {
  var arr = JSON.parse(localStorage.getItem('allFav'));
  arr.forEach(function(obj) {
    var h6Rating = document.createElement("h6")
    h6Rating.innerHTML = ("Rating: " + obj.rating);
    showDogs.appendChild(h6Rating)
    var imgRating = document.createElement('img')
    imgRating.setAttribute("src", (obj.image))
    showDogs.appendChild(imgRating)

  });
}

var button = document.querySelector('#button');
var imgUrl = document.querySelector('#imgUrl');
var rating = document.getElementById('rating');

var ratingArray = []

$('a.breedSelect').click(function() {
  var id = $(this.attr('id'))
  console.log(id);
})
$("#button2").on("click", function () {
  if (rating.value >= 10) {
    var favs = JSON.parse(localStorage.getItem("allFav"));
    if (favs == null) favs = [];
    var favImg = document.getElementById("imgUrl").getAttribute('src');
    var dogRating = document.getElementById("rating").value;
    var favDog = {
      "image": favImg,
      "rating": dogRating
    };
    favs.push(favDog);
    localStorage.setItem("allFav", JSON.stringify(favs));
  }
});
button.addEventListener("click", function() {
  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
      var url = JSON.parse(XHR.responseText).message;
      imgUrl.src = url
    }
  };
  var breed = document.getElementsByClassName('breedSelect')[0].value
  var header = document.getElementById('header')
  var h6 = document.createElement('h6')
  if (window.location.hash === '') {
    XHR.open("GET", `https://dog.ceo/api/breeds/image/random`);
    console.log(window.location.hash);
    header.innerHTML =  ''
    h6.innerHTML =  'Searching all dogs'
    header.appendChild(h6)
  } else {
    XHR.open("GET", `https://dog.ceo/api/breed/${window.location.hash.slice(1)}/images/random`);
    console.log(window.location.hash.slice(1));
    header.innerHTML =  ''
    h1.innerHTML = `Searching all ${window.location.hash.slice(1)}`
    header.appendChild(h1)
  }
  XHR.send();
});

$(document).ready(function() {
  $('select').prop('selectedIndex', 0);
  var menu = document.getElementById('dropdown1')
  var XHR1 = new XMLHttpRequest();

  XHR1.onreadystatechange = function() {
    if (XHR1.readyState == 4 && XHR1.status == 200) {
      var menuBreed = JSON.parse(XHR1.responseText).message;
      console.log(Object.keys(menuBreed).length);
      for (let i = 0; i < Object.keys(menuBreed).length; i++) {
        var li = document.createElement('li')
        li.innerHTML = `<a href=#${(Object.keys(menuBreed)[i])} class='breedSelect' value=${(Object.keys(menuBreed)[i])}>` + (Object.keys(menuBreed)[i]) + '</a>'
        menu.appendChild(li)
      }
    }
  };

  XHR1.open("GET", "https://dog.ceo/api/breeds/list/all");
  XHR1.send();
});
