const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

const CART_INFODESAF_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

var cont = localStorage.getItem("contLogin");
function inciar(){
  if (cont != 1){
  localStorage.setItem("contLogin", 0);
  window.location.href = "login.html";
  }
}


// llamada desde un boton en el NAV en todos los HTML
function olvSesion(){
  localStorage.setItem("contLogin",0); // regresa el valor del KEY contador a 0 para que nos sea imposible navegar por el sitio sin volver a loguearnos
  localStorage.removeItem("eMail");  // elimina el KEY eMail del local storage
  window.location.href = "login.html";
}
function redMyProfile(){
  window.location.href = "my-profile.html"
}

function redCart(){
  window.location.href = "cart.html"
}



function compLogin(){ // funcion que toma el valor EMAIL para mostrarlo cuando el usuario está logueado en un boton de la seccion NAV
  // y pone el contador en 1 para poder navegar por el sitio si estamos logueados
var saveMail = document.getElementById("inputEmail");
localStorage.setItem("eMail", saveMail.value);
localStorage.setItem("contLogin", 1)
}


//agregar nombre de usuario al boton de menu

var emailData = localStorage.getItem("eMail");
      function botUser(){
        document.getElementById("userName").textContent = emailData;
      }
      botUser();

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});