function changeContent(id) {
  console.log("changeContent() started");
  var xhttp = new XMLHttpRequest();
  let url = `/application/character/${id}`; 
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onload = function () {
  if (xhttp.status == 200) {
    data = JSON.parse(xhttp.responseText);
    refreshPage(data);
  } else {
    console.error("Error with Data", xhttp.status, xhttp.responseText);
  }
};
}
function refreshPage(data) {
console.log("refreshPage() started");

document.querySelector("#name").textContent = data.name;
document.querySelector("#desc").textContent = data.desc;
document.querySelector("#image").src = data.image;

}
function toggleFavorite(id) {
console.log("toggleFavorite() started");
var xhttp = new XMLHttpRequest();
let url = `/application/character/toggle-favorite/${id}`;
xhttp.open("POST", url, true);
xhttp.setRequestHeader("Content-Type", "application/json");

xhttp.onload = function () {
  if (xhttp.status === 200) {
    const favorites = JSON.parse(xhttp.responseText);
    console.log("Updated favorites:", favorites);
  } else {
    console.error("Error toggling favorite status", xhttp.status, xhttp.responseText);
  }
};

xhttp.send();
}

function showFavorites() {
console.log("showFavorites() started");
var xhttp = new XMLHttpRequest();
let url = '/application/favorites';
xhttp.open("GET", url, true);
xhttp.send();
xhttp.onload = function () {

  if (xhttp.status === 200) {
    const favorites = JSON.parse(xhttp.responseText);
    displayCharacters(favorites);
  } else {
    console.error("Error loading favorites", xhttp.status, xhttp.responseText);
  }
};

if (xhttp.status == 200) {
  data = JSON.parse(xhttp.responseText);
  refreshPage(data);
} else {
  console.error("Error with ID Data", xhttp.status, xhttp.responseText);
}
};


function changeUniverse(uni) {
  console.log("changeUniverse() started", uni);

  // Hide/show character cards based on the selected universe
  const characterCards = document.querySelectorAll('.character-card');
  for (let i = 0; i < characterCards.length; i++) {
    const card = characterCards[i];
    const cardUni = card.getAttribute('data-uni');
    card.style.display = cardUni === uni ? 'block' : 'none';
  }

    const xhttp = new XMLHttpRequest();
    const url = `/application/character/${uni}`;
    xhttp.open("GET", url, true);
     xhttp.send();

  xhttp.onload = function () {
    if (xhttp.status == 200) {
      const characters = JSON.parse(xhttp.responseText);
      displayCharacters(characters);
    } else {
      console.error("Error with universe Data", xhttp.status, xhttp.responseText);
    }
  };
}


function changeAlignment(alignment) {
var xhttp = new XMLHttpRequest();
let url = `/application/character/${alignment}`; 
xhttp.open("GET", url, true);
console.log("URL: ", url);
xhttp.send();
xhttp.onload = function () {
if (xhttp.status == 200) {
  data = JSON.parse(xhttp.responseText);
  refreshPage(data);
} else {
  console.error("Error with alignment Data", xhttp.status, xhttp.responseText);
}
};

}

function refreshPage(data) {
document.querySelector("#name").textContent = data.name;
document.querySelector("#desc").textContent = data.desc;
document.querySelector("#image").src = data.image;

}
function toggleFavorite(characterId) {
const $characterCard = $('.character-card[data-character-id="' + characterId + '"]');
const isFavorite = $characterCard.hasClass('favorite');

// Toggle the favorite class on the character card
$characterCard.toggleClass('favorite', !isFavorite);

// Update favorites on the server
updateFavoritesOnServer(characterId, !isFavorite);

}

  function showAllCharacters() {
    console.log("showAllCharacters() started");
    var xhttp = new XMLHttpRequest();
    let url = '/application/character'; 
    xhttp.open("GET", url, true);
    xhttp.send();
    xhttp.onload = function () {
      if (xhttp.status === 200) {
        const characters = JSON.parse(xhttp.responseText);
        displayCharacters(characters);
      } else {
        console.error("Error loading characters", xhttp.status, xhttp.responseText);
      }
    };
  }
  


function displayCharacters(characters) {
console.log("displayCharacter() started");
// Update the DOM to display only favorite characters
const characterContainer = document.querySelector('.character-container');
characterContainer.innerHTML = "";

characters.forEach(character => {
  const characterCard = createCharacterCard(character);
  characterContainer.appendChild(characterCard);
});
}

function createCharacterCard(character) {
console.log("createCharacterCard() started");
// Create a character card HTML element
const card = document.createElement('div');
card.classList.add('character-card');
card.onclick = () => changeContent(character.id);

const image = document.createElement('img');
image.classList.add('character-image');
image.src = character.image;
image.alt = character.name;

const name = document.createElement('div');
name.classList.add('character-name');
name.textContent = character.name;

const favoriteButton = document.createElement('button');
favoriteButton.classList.add('btn', 'btn-secondary', 'favorite-button');
favoriteButton.textContent = 'Favorite';
favoriteButton.onclick = () => toggleFavorite(character.id);

card.appendChild(image);
card.appendChild(name);
card.setAttribute('data-uni', character.uni);
card.appendChild(favoriteButton);

return card;
}

// Load and display all characters on page load
//showFavorites();