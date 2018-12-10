function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  displayCharacters(userDatas);
  showDetails(userDatas);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function showDetails(charBio) {
  console.log(charBio);
}

function addClickEventListener(element, charBio) {
  element.addEventListener('click', function() { showDetails(charBio) });
}

function displayCharacters(userDatas) {
  var aliveCharacters = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (!userDatas[i].hasOwnProperty('dead')) {
      aliveCharacters.push(userDatas[i]);
    }
  }
  for (var i = 0; i < aliveCharacters.length - 1; i++) {
    for (var j = i+1; j < aliveCharacters.length; j++) {
      if (aliveCharacters[i].name > aliveCharacters[j].name) {
        var temp = [aliveCharacters[i], aliveCharacters[j]];
        aliveCharacters[i] = temp[1];
        aliveCharacters[j] = temp[0];
      }
    }
  }
  
  for (var i = 0; i < aliveCharacters.length; i++) {
    var div = document.querySelector(".main-div")
    div.innerHTML += `<div id="i" class="main-div__char-divs">
                      <img class="main-div__char-pics" src="${aliveCharacters[i].portrait}">
                      <span class="main-div__char-spans">${aliveCharacters[i].name}</span>
                      </div>`
    var charSpan = document.querySelectorAll(".main-div__char-spans")
    addClickEventListener(charSpan[i], aliveCharacters[i].bio)
  }
}
