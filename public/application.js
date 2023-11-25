
// the Header Section is not generated from the REST API.


function changeContent(id) {
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
 //buttons
  document.querySelector("#name").textContent = data.name;
  document.querySelector("#desc").textContent = data.desc;
  document.querySelector("#image").src = data.image;

}

