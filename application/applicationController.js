const fs = require('fs').promises;

class ApplicationController {
  constructor(req) {
    try {
      var rawData = fs.readFileSync("application/data/applicationData.json");
      this.finalData = JSON.parse(rawData);
    } catch (error) {
      console.error("Error with reading/parsing JSON file", error);
    }

    try {
      var favoritesData = fs.readFileSync("application/data/favoritesData.json");
      this.favorites = JSON.parse(favoritesData);
    } catch (error) {
      console.error("Error with reading/parsing favorites JSON file", error);
      this.readFavoritesData();
    }
  }
    async readFavoritesData() {
      try {
        const favoritesData = await fs.readFile("application/data/favoritesData.json");
        this.favorites = JSON.parse(favoritesData);
      } catch (error) {
        console.error("Error with reading/parsing favorites JSON file", error);
        this.favorites = {};
      }
  }

  getAllCharacters() {
    return this.finalData;
  }

  getCharacterById(id) {
    if (id >= 0 && id < this.finalData.length) {
      const character = this.finalData[id];
      return character;
    } else {
      return { error: "finalData character not found", id };
    }
  }

  getAllFavorites() {
    return this.favorites;
  }

  updateFavoriteStatus(id, isFavorite) {
    this.favorites[id] = isFavorite;
    fs.writeFileSync("application/data/favoritesData.json", JSON.stringify(this.favorites, null, 2));
  }
  getFavoritesPage() {
    const favorites = Object.entries(this.favorites)
      .filter(([characterId, isFavorite]) => isFavorite)
      .map(([characterId, isFavorite]) => {
        const character = this.finalData[characterId];
        return { ...character, isFavorite };
      });

    return favorites;
}
}
module.exports = ApplicationController;