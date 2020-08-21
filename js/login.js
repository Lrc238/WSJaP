function olvSesion(){
    localStorage.setItem("contLogin",0); // regresa el valor del KEY contador a 0 para que nos sea imposible navegar por el sitio sin volver a loguearnos
    localStorage.removeItem("eMail");  // elimina el KEY eMail del local storage
    window.location.href = "login.html";
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

