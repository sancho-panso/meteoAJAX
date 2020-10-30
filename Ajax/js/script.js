(function(){
 var manoAjax = new XMLHttpRequest();
 manoAjax.onreadystatechange = function(){
     if(manoAjax.readyState === 4){
         if(manoAjax.status === 200){
             document.querySelector('aside').innerHTML = manoAjax.responseText;
         }else{
             alert(manoAjax.statusText);
         }
     }
 }
 manoAjax.open('GET', 'nav/nav.html');
 document.querySelector('button.showMenu').onclick = function(){
     manoAjax.send();
     document.querySelector('button.showMenu').style.display="none";
 }

    
    
  

})();