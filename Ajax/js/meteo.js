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

    let manoAjax = new XMLHttpRequest();
    manoAjax.onreadystatechange = function(){
        if(manoAjax.readyState === 4){
            if(manoAjax.status === 200){
               let orai = JSON.parse(manoAjax.responseText);
               console.log(orai);
               createTable(orai);
            }else{
                alert(manoAjax.statusText);
            } 
        }
    }
   
    
       document.querySelector('#myBtn').onclick = function(){
       let inputValue = document.querySelector('#place').value
       let options = document.querySelectorAll('option')
       let location;
       options.forEach(option => {
           if(option.value == inputValue) location = option.id;
       });
       let path = 'https://api.meteo.lt/v1/places/' + location + '/forecasts/long-term'
       console.log(path);
       manoAjax.open('GET', path);
       manoAjax.send();
       xhr.open('GET', 'https://api.meteo.lt/v1/places');
       xhr.send();

      }

      function createTable (orai) {
            if(document.contains(document.getElementById('myTable'))){
                document.getElementById('myTable').remove();
            }
           let table = document.createElement('table');
           table.setAttribute('id', 'myTable')
           let header = document.createElement('thead');
           let headerName = document.createElement('th');
           let headerText= document.createElement('tr')
           table.appendChild(header);
           header.appendChild(headerName);
           headerName.appendChild(headerText);
           headerName.colSpan = 12;
           headerText.textContent = orai.place.name;
           let tableBody = document.createElement('tbody');
           let tableRow1 = document.createElement('tr')
           for (let index = 0; index < 12; index++) {
           let cell = document.createElement('td');
           let date = orai.forecastTimestamps[index].forecastTimeUtc;
           cell.innerHTML = date.slice(10,16);
           tableRow1.appendChild(cell);
           }
           tableBody.appendChild(tableRow1);
           let tableRow2 = document.createElement('tr')
           for (let index = 0; index < 12; index++) {
           let cell = document.createElement('td');
           cell.innerHTML = orai.forecastTimestamps[index].airTemperature + '  <i class="fas fa-temperature-low"></i>';
           tableRow2.appendChild(cell);
           }
           tableBody.appendChild(tableRow2);
           let tableRow3 = document.createElement('tr')
           for (let index = 0; index < 12; index++) {
           let cell = document.createElement('td');
           let icon = document.createElement('i');
           switch (orai.forecastTimestamps[index].conditionCode) {
               case 'clear':
                  icon.className = "fas fa-sun";
                   break;
               case 'isolated-clouds':
                  icon.className = "fas fa-cloud-sun"
                   break;
               case 'scattered-clouds':
                  icon.className = "fas fa-cloud-sun"
                   break;
               case 'overcast':
                  icon.className = "fas fa-cloud "
                   break;
               case 'light-rain':
                  icon.className = "fas fa-cloud-sun-rain "
                   break;
               case 'moderate-rain':
                  icon.className = "fas fa-cloud-sun-rain "
                   break;
               case 'heavy-rain':
                  icon.className = "fas fa-cloud-shower-heavy "
                   break;
               case 'sleet-rain':
                  icon.className = "fas fa-cloud-shower-heavy "
                   break;
               case 'light-snow':
                  icon.className = "fas fa-snowflake "
                   break;
               case 'moderate-snow':
                  icon.className = "fas fa-snowflake "
                   break;
               case 'heavy-snow':
                  icon.className = "fas fa-snowflake "
                   break;
               case 'fog':
                  icon.className = "fas fa-smog "
                   break;
               case 'na':
                  icon.className = "far fa-grin-beam "
                   break;
             
           }
           cell.appendChild(icon);
           tableRow3.appendChild(cell);
           }
           tableBody.appendChild(tableRow3);
           table.appendChild(tableBody);
           document.querySelector('#table').appendChild(table);
        }
      
   
   })();