(function(){
    
    let manoAjax = new XMLHttpRequest();
    manoAjax.onreadystatechange = function(){
        if(manoAjax.readyState === 4){
            if(manoAjax.status === 200){
               let orai = JSON.parse(manoAjax.responseText);
               console.log(orai);
               createTable(orai);
              // console.log(document.querySelector('#place').value);
               document.querySelector('#place').value = ''
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
       manoAjax.open('GET', path);
       manoAjax.send();
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
           chooseIcon(icon, orai, index);
           cell.appendChild(icon);
           tableRow3.appendChild(cell);
           }
           tableBody.appendChild(tableRow3);
           table.appendChild(tableBody);
           document.querySelector('#table').appendChild(table);
        }


        function chooseIcon(element, orai, index){
            switch (orai.forecastTimestamps[index].conditionCode) {
                case 'clear':
                   isItDay(orai, index) ? element.className = "fas fa-sun" : element.className = "far fa-moon";
                    break;
                case 'isolated-clouds':
                   isItDay(orai, index) ? element.className = "fas fa-cloud-sun": element.className = "fas fa-cloud-moon";
                    break;
                case 'scattered-clouds':
                   isItDay(orai, index) ? element.className = "fas fa-cloud-sun": element.className = "fas fa-cloud-moon";
                    break;
                case 'overcast':
                   element.className = "fas fa-cloud "
                    break;
                case 'light-rain':
                   isItDay(orai, index) ? element.className = "fas fa-cloud-sun-rain ": element.className = "fas fa-cloud-moon-rain";
                    break;
                case 'moderate-rain':
                    isItDay(orai, index) ? element.className = "fas fa-cloud-sun-rain ": element.className = "fas fa-cloud-moon-rain";
                    break;
                case 'heavy-rain':
                   element.className = "fas fa-cloud-shower-heavy "
                    break;
                case 'sleet-rain':
                   element.className = "fas fa-cloud-shower-heavy "
                    break;
                case 'light-snow':
                   element.className = "fas fa-snowflake "
                    break;
                case 'moderate-snow':
                   element.className = "fas fa-snowflake "
                    break;
                case 'heavy-snow':
                   element.className = "fas fa-snowflake "
                    break;
                case 'fog':
                   element.className = "fas fa-smog "
                    break;
                case 'na':
                   element.className = "far fa-grin-beam "
                    break;
            }
            return element
        }

        function isItDay(orai, index){
            let time = orai.forecastTimestamps[index].forecastTimeUtc;
            time = time.slice(10,13)*1
            if (time > 20 || time <7 ) {
                return false;
            } else {
                return true;
            }
        }

})();