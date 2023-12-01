const fs = require('fs');
const favoritesPath = 'application/data/favorites.json';
class applicationController {

  constructor(req) {

    try {
    var rawData = fs.readFileSync("application/data/applicationData.json");
    this.finalData = JSON.parse(rawData);
  } catch(error) {
    console.error("Error with reading/parsing JSON file", error);
  }}

    getAllCharacters() {
      return this.finalData;
    }

    getCharacterById(id) {
  if (id >= 0 && id < this.finalData.length) {
    const character = this.finalData[id];
    return character; 
  } else {
    return { error: "finalData character not found" , id};
  }
}
getFavorites() {
    console.log("getFavorites() started");
    try {
      const rawData = fs.readFileSync(favoritesPath);
      return JSON.parse(rawData);
    } catch (error) {
      return [];
    }
  }

  saveFavorites(favorites) {
    console.log("saveFavorites() started");
    const data = JSON.stringify(favorites);
    fs.writeFileSync(favoritesPath, data);
  }

  toggleFavorite(characterId) {
    const favorites = this.getFavorites();

    // Toggle favorite status
    const index = favorites.indexOf(characterId);
    if (index === -1) {
      favorites.push(characterId);
    } else {
      favorites.splice(index, 1);
    }

    // Save updated favorites
    this.saveFavorites(favorites);

    return favorites;
  }

  getFavoriteCharacters() {
    const favorites = this.getFavorites();
    return this.finalData.filter(character => favorites.includes(character.id));
  }
}

module.exports = applicationController;