(function(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            var mokiniai = JSON.parse(xhr.responseText);
            console.log(mokiniai);
            let list = '<ul>';
            for (let index = 0; index < mokiniai.length; index++) {
                if (mokiniai[index].lokacija === true) {
                    list += '<li class="yra">'
                }else{
                    list += '<li class="nera">'
                }
                list += mokiniai[index].vardas;
                list += '</li>';
            }
            list += '</ul>';
            document.querySelector('.mokiniai').innerHTML= list;
        }
    }

    xhr.open('GET', 'duomenys/mokiniai.json');
    xhr.send();
 
   
   })();