(function(){
    
 let manoAjax = new XMLHttpRequest();
 manoAjax.onreadystatechange = function(){
     if(manoAjax.readyState === 4){
         if(manoAjax.status === 200){
            let orai = JSON.parse(manoAjax.responseText);
            console.log(orai);
         }else{
             alert(manoAjax.statusText);
         }
     }
 }

 
    document.querySelector('#myBtn').onclick = function(){
    let location = document.querySelector('#place').value
    console.log(location);
    let path = 'https://api.meteo.lt/v1/places/' + location + '/forecasts/long-term'
    console.log(path);
    manoAjax.open('GET', path);
    manoAjax.send();
}
})();