(function(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            var places = JSON.parse(xhr.responseText);
            let optionList = document.querySelector('#places');
            for (let index = 0; index < places.length; index++) {
                   let option = document.createElement('option');
                   option.id = places[index].code;
                   option.value = places[index].name;
                    optionList.appendChild(option);
            }
        }
    }

    xhr.open('GET', 'https://api.meteo.lt/v1/places');
    xhr.send();

   
      
   
   })();