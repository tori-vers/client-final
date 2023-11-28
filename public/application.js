
// the Header Section is not generated from the REST API.

function changeUniverse(uni) {
  Console.log("(Public) Application: changeUniverse() started!");

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
  Console.log("(Public) Application: changeContent() started!");

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

function refreshPage(data) {
  Console.log("(Public) Application: refreshPage() started!");
 //buttons
  document.querySelector("#name").textContent = data.name;
  document.querySelector("#desc").textContent = data.desc;
  document.querySelector("#image").src = data.image;
  
  //favorite button - heart
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
  


