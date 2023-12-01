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
