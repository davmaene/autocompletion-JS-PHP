
(function() {
var searchElement = document.getElementById('search'),
results = document.getElementById('results'),
selectedResult = -1,
previousRequest, 
previousValue = searchElement.value; 
function getResults(keywords) {
var xhr = new XMLHttpRequest();
xhr.open('GET', './back/index.php?s='+
encodeURIComponent(keywords));
xhr.onreadystatechange = function() {
if (xhr.readyState == 4 && xhr.status == 200) {
displayResults(xhr.responseText);
}
};
xhr.send(null);
return xhr;
}
function displayResults(response) {
results.style.display = response.length ? 'block' : 'none';
// On cache le conteneur si on n'a pas de résultats
if (response.length) { 
response = response.split('|');
var responseLen = response.length;
results.innerHTML = ''; // On vide les résultats
for (var i = 0, div ; i < responseLen ; i++) {
div =
results.appendChild(document.createElement('div'));
div.innerHTML = response[i];
div.onclick = function() {
chooseResult(this);
};
}
}
}
function chooseResult(result) { 
results.style.display = 'none'; // On cache les résultats
result.className = ''; // On supprime l'effet de focus
selectedResult = -1; // On remet la sélection à zéro
searchElement.focus(); // 
} 
searchElement.onkeyup = function(e) {
e = e || window.event; 
var divs = results.getElementsByTagName('div');
if (e.keyCode == 38 && selectedResult > -1) { 
divs[selectedResult--].className = '';
if (selectedResult > -1) { // Cette condition évite unemodification de childNodes[-1], qui n'existe pas, bien entendu

divs[selectedResult].className = 'bg-danger';
}
}
else if (e.keyCode == 40 && selectedResult < divs.length - 1)
 { // Si la touche pressée est la flèche « bas »
results.style.display = 'block'; // On affiche les
if (selectedResult > -1) { // Cette condition évite une modification de childNodes[-1], qui n'existe pas, bien entendu

divs[selectedResult].className = '';
}
divs[++selectedResult].className = 'bg-danger';
}
else if (e.keyCode == 13 && selectedResult > -1) { 
chooseResult(divs[selectedResult]);
}
else if (searchElement.value != previousValue) { // 
previousValue = searchElement.value;
if (previousRequest && previousRequest.readyState < 4) {
previousRequest.abort(); 
}
previousRequest = getResults(previousValue); 
selectedResult = -1; 
}
};
})();