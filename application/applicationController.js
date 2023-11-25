const fs = require('fs');

class applicationController {

  constructor(req) {

    try {
    //  console.log("Reading JSON");
    var rawData = fs.readFileSync("application/data/applicationData.json");
     // console.log("parsing");
    this.finalData = JSON.parse(rawData);
    //  console.log("Loaded", this.finalData);
  } catch(error) {
    console.error("Error with reading/parsing JSON file", error);
  }}

    getAllCharacters() {
      //return all characters data
      return this.finalData;
    }

    getCharacterById(id) {

  // if the id is valid (between 0 and the end of the values)
  if (id >= 0 && id < this.finalData.length) {
    const character = this.finalData[id];
    return character; 
  } else {
    return { error: "finalData character not found" , id};
  }
}
}
module.exports = applicationController;