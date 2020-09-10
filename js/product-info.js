var productInf = []
var productRel = []
var addCom = ""
var valorStars = '';

$("input[name='rate']" ).on('change', function () {
    valorStars = $(this).val();
});

function carrouselDeImg(array){
    let carrousel = "";

    if(carrousel == ""){
        carrousel += `
        <div class="carousel-item active"> 
        <img src="`+productInf.images[0]+`" class="d-block w-100" alt="`+productInf.images[0]+`"></div>
        <div class="carousel-item">
        <img src="`+productInf.images[1]+`" class="d-block w-100" alt="`+productInf.images[1]+`"></div>
        <div class="carousel-item">
        <img src="`+productInf.images[2]+`" class="d-block w-100" alt="`+productInf.images[2]+`"></div>
        <div class="carousel-item">
        <img src="`+productInf.images[3]+`" class="d-block w-100" alt="`+productInf.images[3]+`"></div>
        <div class="carousel-item">
        <img src="`+productInf.images[4]+`" class="d-block w-100" alt="`+productInf.images[4]+`"></div>
        `
    }document.getElementById("carrImg").innerHTML = carrousel;
}

function relacionados(array1,array2){
    let prodInf = array1;
    let prodRel = array2;
    let appendTarjeta = []
    
    for (rel of prodInf.relatedProducts){
        
        appendTarjeta +=`
            <div class="col-6">
                <div class="card border-dark" style="width: 18rem; height: 410px;">
                    <img src="`+prodRel[rel].imgSrc+`" class="card-img-top" alt="`+prodRel[rel].imgSrc+`">
                    <div class="card-body">
                        <h5 class="card-title">`+prodRel[rel].name+`</h5>
                        <p class="card-text" style="height:75px;">`+prodRel[rel].description+`</p>
                        <a href="product-info.html" class="btn btn-primary">IR</a>
                    </div>
                </div>
            </div>
            `
    }document.getElementById("tarjetas").innerHTML = appendTarjeta;
}

function staticComments(array){
                let comentarios = array
                var a = -1
                let agregarComentario = ""

                for (let i = 0; i < comentarios.length; i++) {
                    let coment = comentarios[i];
                    a += 1
                      
                    let puntuacion = coment.score - 1;
                    let stars = "";
                    for (let i = 0; i < 5; i++) {
                 
                        if(i <= puntuacion){
                            stars += ` 
                            <div><img style="width: 18px;" src="img/star-solid-or.png" alt=""></div> 
                            `;
                        }else{
                            stars += ` 
                            <div><img style="width: 18px;" src="img/star-solid.png" alt=""></div> 
                            `;
                        }
                    }

                agregarComentario +=`
                    <div style="background-color: lightgrey;" class="col-12 border rounded border-dark mb-2">
                        <div class="row justify-content-between ml-0 mr-2 mt-2">
                            <div class="col-6">
                                <label><strong>`+comentarios[a].user+`</strong>
                                <span class="mute"> - `+comentarios[a].dateTime+` -</span></label>
                            </div>
                            <div class="col-3 justify-content-end">
                                <div class="row justify-content-end">`+stars+`</div>
                            </div>
                        </div>
                            <hr class="mx-2 my-0">
                            <div class="mx-2 mt-2">
                                <label class="small">`+comentarios[a].description+`</label>
                            </div>
                    </div>
                ` 
                }document.getElementById("estaticComents").innerHTML = agregarComentario;           
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productInf = resultObj.data;
           
            document.getElementById("productName").innerHTML = productInf.name;
            document.getElementById("precioProd").innerHTML = productInf.currency + ": " + productInf.cost;
            document.getElementById("prodDesc").innerHTML = productInf.description;
            document.getElementById("prodCat").innerHTML = productInf.category;
            document.getElementById("cantVend").innerHTML = productInf.soldCount;
            carrouselDeImg(productInf.images)

        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
                       if (resultObj.status === "ok") {
                               productRel = resultObj.data;

                               relacionados(productInf,productRel);
                       }
       });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                        if (resultObj.status === "ok") {
                            let comentarios = resultObj.data;
                                staticComments(comentarios);       
                        }
    });
});

document.getElementById("submiting").addEventListener("click", function(){

    var fecha = new Date(),
        segundos = fecha.getSeconds(),
        horas = fecha.getHours(),
        minutos = fecha.getMinutes(),
        dia = fecha.getDate(),
        mes = fecha.getMonth(),
        year = fecha.getFullYear().toString();

        if (horas < 10){horas = '0' + horas;}
        if (minutos < 10){ minutos = "0" + minutos; }
        if (segundos < 10){ segundos = "0" + segundos; }

    var username = localStorage.getItem("eMail");
    var newText = document.getElementById('comntText')


    let puntos = "";
    for (let i = 0; i < 5; i++) {
 
        if(i <= valorStars-1){
            puntos += ` 
            <div><img style="width: 18px;" src="img/star-solid-or.png" alt=""></div> 
            `;
        }else{
            puntos += ` 
            <div><img style="width: 18px;" src="img/star-solid.png" alt=""></div> 
            `;
        }
    }


    addCom += `
        <div style="background-color: lightgrey;" class="col-12 border rounded border-dark mb-2">
            <div class="row justify-content-between ml-0 mr-2 mt-2">
                <div class="col-6">
                    <label><strong>${username}</strong>
                    <span class="mute"> - ${year+"-"+mes+"-"+dia+" "+horas+":"+minutos+":"+segundos} -</span></label>
                </div>
                <div class="col-3 justify-content-end">
                    <div class="row justify-content-end">${puntos}</div>
                </div>
            </div>
                <hr class="mx-2 my-0">
                <div class="mx-2 mt-2">
                    <label class="small">${newText.value}</label>
                </div>
        </div>
    ` 
    if (newText !== ""){
    document.getElementById("newComents").innerHTML = addCom;

    document.getElementById("comntText").value = " ";
    document.getElementByName("rate").value = 1;
    }
});





