var userData = { mail: '', name: '', surname: '', phone: '' }


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostUserMail();
    obtenerDatos();
});

function mostUserMail(){
    let userMail = localStorage.getItem("eMail");
    $('#userMail').attr('value', userMail);
    document.getElementById('usEmail').innerHTML = userMail
}   

function saveUser(){
    let getName = document.getElementById('userNames');
    let getSurname = document.getElementById('userSurname');
    let getPhone = document.getElementById('userPhone');
    let userMail = localStorage.getItem("eMail");

    // let userData = 
    // {
    //     mail: userMail,
    //     name: getName.value,
    //     surname: getSurname.value,
    //     phone: getPhone.value
    // }
    
    localStorage.setItem('profiles',
        JSON.stringify(
            {
                mail: userMail,
                name: getName.value,
                surname: getSurname.value,
                phone: getPhone.value
            }
        )
    )
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function obtenerDatos(){
    let userDataString = localStorage.getItem('profiles');
    userData = JSON.parse(userDataString)
    let mailKey = localStorage.getItem("eMail");

    console.log(userData)

    document.getElementById('usName').innerHTML = userData.name
    document.getElementById('usSurname').innerHTML = userData.surname
    document.getElementById('usEmail').innerHTML = mailKey
    document.getElementById('usPhone').innerHTML = userData.phone
}
