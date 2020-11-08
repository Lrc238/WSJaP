var userData = { mail: '', name: '', surname: '', age: '', phone: ''}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    if (localStorage.getItem("img") === null) {
        localStorage.setItem("img", '')
    }
    
    document.querySelector('#userPic').addEventListener('change', function(){
        const reader = new FileReader();
        
        reader.addEventListener("load", ()=> {
            localStorage.setItem("img", reader.result)
        })
        
        reader.readAsDataURL(this.files[0]);
        
    });
    
    mostUserMail();
    obtenerDatos();
    camImgPerf();
});

function mostUserMail(){
    let userMail = localStorage.getItem("eMail");
    $('#userMail').attr('value', userMail);
    document.getElementById('usEmail').innerHTML = userMail
}   

function saveUser(){
    let getName = document.getElementById('userNames');
    let getSurname = document.getElementById('userSurname');
    let getAge = document.getElementById('userAge');
    let getPhone = document.getElementById('userPhone');
    let userMail = localStorage.getItem("eMail");
    
    localStorage.setItem('profiles',
        JSON.stringify(
            {
                mail: userMail,
                name: getName.value,
                surname: getSurname.value,
                age: getAge.value,
                phone: getPhone.value
            }
        )
    )
    camImgPerf();
}

function camImgPerf(){
    let imgPerf = localStorage.getItem('img');
    if(!imgPerf){
        localStorage.setItem('img', "")
    }

    console.log(imgPerf)

    if(imgPerf){
        document.querySelector('#imgPerf').setAttribute('src', imgPerf);
    }
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


    document.getElementById('usName').innerHTML = userData.name
    document.getElementById('usSurname').innerHTML = userData.surname
    document.getElementById('usAge').innerHTML = userData.age
    document.getElementById('usEmail').innerHTML = mailKey
    document.getElementById('usPhone').innerHTML = userData.phone
}