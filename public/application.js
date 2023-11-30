
// the Header Section is not generated from the REST API.
let favorites = [];

// Fetch user's favorite characters from the Favorite API
function getFavorites() {
  fetch('/favorite')
    .then(response => response.json())
    .then(data => {
      favorites = data;
      refreshPage(data);
    })
    .catch(error => console.error('Error fetching favorites:', error));
}

// check if a character is a favorite
function isFavorite(characterId) {
  return favorites.includes(characterId);
}

function toggleFavorite(characterId) {
  fetch(`/favorite/${characterId}`, { method: 'PUT' })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to toggle favorite status');
      }
    })
    .then(data => {
      favorites = data;
      refreshPage(data);
    })
    .catch(error => console.error('Error toggling favorite:', error));
}
// Refresh the page with character data and favorite status
function refreshPage(data) {
  console.log("(Public) Application: refreshPage() started!");

  // Update character details
  document.querySelector("#name").textContent = data.name;
  document.querySelector("#desc").textContent = data.desc;
  document.querySelector("#image").src = data.image;

  // Update favorite button - heart
  var heartIcon = document.createElement("div");
  heartIcon.classList.add("heart-icon");
  if (isFavorite(data.id)) {
    heartIcon.classList.add("favorite");
  }

  var existingButton = document.querySelector(".heart-icon");
  if (existingButton) {
    existingButton.replaceWith(heartIcon);
  } else {
    document.querySelector("#buttons").appendChild(heartIcon);
  }

  heartIcon.addEventListener("click", function () {
    toggleFavorite(data.id);
  });
}

// Initial setup - get user's favorite characters
getFavorites();
function changeUniverse(uni) {
  console.log("(Public) Application: changeUniverse() started!");

  var xhttp = new XMLHttpRequest();
  let url = `/application/character/${uni}`;

  xhttp.open("GET", url, true);
  xhttp.send();

  xhttp.onload = function() {
    if (xhttp.status == 200) {
      var data = JSON.parse(xhttp.responseText);
      refreshPage(data);
    } else {
      console.error("Error with universe", xhttp.status);
    }
  }

}
function changeContent(id) {
  console.log("(Public) Application: changeContent() started!");

  // HTTP request
  //  console.log("testing");
    var xhttp = new XMLHttpRequest();
    let url = `/application/character/${id}`; //relative link
    
    xhttp.open("GET", url, true);
    xhttp.send();
 //  console.log("testing 2");

    xhttp.onload = function () {
    if (xhttp.status == 200) {
      data = JSON.parse(xhttp.responseText);
      refreshPage(data);
    } else {
      console.error("Error with Data", xhttp.status, xhttp.responseText);
    }
  };
}


  


