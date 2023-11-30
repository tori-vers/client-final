const fs = require('fs');
console.log("ApplicationController: variables declared.");

class ApplicationController {

    constructor(req) {
        console.log("ApplicationController: constructor() started");

        try {
            console.log("Reading JSON");
            var rawData = fs.readFileSync("application/data/applicationData.json");

            console.log("Parsing");
            this.finalData = JSON.parse(rawData);

            console.log("Loaded", this.finalData);
        } catch (error) {
            console.error("Error with reading/parsing JSON file", error);
        }

        // Initialize user object
        this.user = {
            id: 1, // should the user id change somehow?
            favorites: [] 
        };
    }

    toggleFavorite(characterId) {
        const index = this.user.favorites.indexOf(characterId);

        if (index !== -1) {
            this.user.favorites.splice(index, 1);
        } else {
            // If the character is not a favorite, add it
            this.user.favorites.push(characterId);
        }
        
        console.log('Updated favorites:', this.user.favorites);
        return this.user.favorites;
    }

    getFavorites() {
        console.log("ApplicationController: getFavorites() started");
        const userFavorites = this.finalData.filter(character => {
            return this.user.favorites.includes(character.id);
        });

        console.log('User favorites:', userFavorites);
        return userFavorites;
    }


    getAllCharacters() {
      console.log("ApplicationController: getAllCharacters() started");

      //return all characters data
      return this.finalData;
    }

    getCharacterById(id) {
        console.log("ApplicationController: getCharacterById() started");

        // if the id is valid (between 0 and the end of the values)
        if (id >= 0 && id < this.finalData.length) {
            const character = this.finalData[id];
            return character; 
        } else {
            return { error: "finalData character not found" , id};
        }
    }

    getCharacterByUni(uni) {
        console.log("ApplicationController: getCharacterByUni() started");
        const universe = this.finalData[uni];
        return universe;
    }
}
module.exports = ApplicationController; // changed from "applicationController" to "ApplicationController"