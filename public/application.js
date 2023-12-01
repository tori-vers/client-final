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
  card.appendChild(favoriteButton);

  return card;
}

// Load and display all characters on page load
//showFavorites();