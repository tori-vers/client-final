const fs = require('fs');

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
}
module.exports = applicationController;