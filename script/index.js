
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
        if (response.length) { 
            response = response.split('|');
            var responseLen = response.length;
            results.innerHTML = ''; 
            for (var i = 0, div ; i < responseLen ; i++) {
                div =
                results.appendChild(document.createElement('div'));
                div.innerHTML = response[i];
                div.className = "border-bottom py-2 nav-link";
                div.onclick = function() {
                    // console.log(this.innerHTML);
                    chooseResult(this);
                };
            }
        }
    }
    function chooseResult(result) { 

        results.style.display = 'none'; 
        result.className = ''; 
        selectedResult = -1; 
        searchElement.value = result.innerHTML;
        searchElement.focus(); 
    } 
    searchElement.onkeyup = function(e) {
        e = e || window.event; 
        var divs = results.getElementsByTagName('div');
        if (e.keyCode == 38 && selectedResult > -1) { 
                divs[selectedResult--].className = '';
            if (selectedResult > -1) {
                divs[selectedResult].className = 'border-bottom py-2 nav-link';
            }
        }
        else if (e.keyCode == 40 && selectedResult < divs.length - 1) {
                results.style.display = 'block'; 
            if (selectedResult > -1) { 
                divs[selectedResult].className = '';
            }
            divs[++selectedResult].className = 'border-bottom py-2 nav-link';
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