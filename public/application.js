function changeContent(id) {
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


function updateFavoritesOnServer(characterId, isFavorite) {
  // Send a POST request to update favorites on the server
  $.post('/api/favorites', { characterId, isFavorite }, (data) => {
    console.log(data);
  });
}   


  


