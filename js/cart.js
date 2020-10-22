var cartProducts = []
var buySucceded = []
var appendArt = []
var appendAux = []
var arts = 0
var subT = 0

function mostrarArtículosEnCarrito(array){
    let cartInfo = array;
    let cartItems = cartInfo.articles
    
        for (let i = 0; i < cartItems.length; i++){

            arts += 1
            var inpId = "inpId_" + i;
            var pId = "pId_" + i;

            appendArt +=`
            <div class="row border border-dark rounded my-1 borrable">
                <div class="col-2 my-auto"><img class="rounded mx-auto d-block my-1 image" style="height: 100px;" src="${cartInfo.articles[i].src}" alt=""></div>
                <div class="col-3 border-left border-dark my-auto"><p>${cartInfo.articles[i].name}</p></div>
                    <div class="col-2 border-left border-dark my-auto">
                        <div class="row">  
                            <div class="col-2 my-auto "><p>${cartInfo.articles[i].currency}</p></div>
                            <div class="col-3 my-auto ml-2"><p>${cartInfo.articles[i].unitCost}</p></div>
                            <div class="col-6 my-auto"></div>
                        </div>
                    </div>
                <div class="col-2 border-left border-dark my-auto"><input name="inputNum" min="0" onchange="" class="form-control inputNum ipert" type="number" value="1" id="${inpId}"></div>
                <div class="col-3 border-left border-dark my-auto">
                    <div class="row"> 
                        <div class="col-1 pt-4"><strong><p >${cartInfo.articles[i].currency}</p></strong></div>
                        <div class="col-2 ml-2 pt-4"><strong><p id="${pId}"></p></strong></div>
                        <div class="col-4"></div><div class="col-3"><button style="width: 70px; height: 70px" class="btn btn-danger buttonDelete" id="bot_${i}">X</button></div>
                    </div>
                </div> 
            </div>
            `;
        
        }

        document.getElementById("itemRow").innerHTML = appendArt;

        for (let f = 0; f < cartItems.length; f++){
            var var1 = document.getElementById("inpId_"+f)
            document.getElementById("pId_"+f).innerHTML = cartInfo.articles[f].unitCost * var1.value;
        }

}

function subtotalxprod(array){
    let cantItems = array.articles
    let cantiItems = document.querySelectorAll('.image');
    for (let f = 0; f < cantiItems.length; f++){
        let val = document.getElementById('inpId_'+f).value * cantItems[f].unitCost
        document.getElementById("pId_"+f).innerHTML = val
    }
}

function subtotal(array){
    let cantItems = array.articles
    let cantiItems = document.querySelectorAll('.image');
    let subTnue = 0

    for (let f = 0; f < cantiItems.length; f++){

        if (cantItems[f].currency === "USD"){
            
            subTnue += Number(document.getElementById("pId_"+f).innerText) * 40
            
        }else{
            subTnue += Number(document.getElementById("pId_"+f).innerText)
        }
    }
    document.getElementById('subT').innerHTML = "UYU " + subTnue
}

function nueCostoEnvio(array){
    let cantItems = array.articles
    let cantiItems = document.querySelectorAll('.image');
    var seleccion = document.getElementsByName('publicationType');
    let subTdolar = 0
    let subTpesos = 0

    for(i=0; i<seleccion.length; i++){
        if(seleccion[i].checked){
            seleccion = seleccion[i].value;
        }
    }
    
    for (let f = 0; f < cantiItems.length; f++){
        if (cantItems[f].currency === "USD"){
            subTdolar += document.getElementById('inpId_'+f).value * (cantItems[f].unitCost*40);
        }else{
            subTpesos += document.getElementById('inpId_'+f).value * cantItems[f].unitCost;
        }
    }
    
    let nueSubt = subTdolar + subTpesos
    let costEnvxTipo = nueSubt * seleccion
    document.getElementById("costEnv").innerHTML = "UYU "+ costEnvxTipo.toFixed(0);
}

function totalEnv(){
    let b = Number(document.getElementById("subT").textContent.replace('UYU ',''));
    let a = Number(document.getElementById("costEnv").textContent.replace('UYU ',''));
    let tot = a+b
    document.getElementById("totalEnv").innerHTML = tot
}

function finCompra(){
    alert(buySucceded);
}

function recalcular(array){
    subtotal(array);
    nueCostoEnvio(array);
    totalEnv();
}

function forPago(){
    let valForPago = document.querySelector('input[name="fPago"]:checked').value;
    document.getElementById("forPagoSeleccionada").innerHTML = valForPago;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFODESAF_URL).then(function(resultObj){
        
        if (resultObj.status === "ok"){
            cartProducts = resultObj.data;
            mostrarArtículosEnCarrito(cartProducts);
            subtotal(cartProducts);
            nueCostoEnvio(cartProducts);
            totalEnv();
        }

        
        document.addEventListener("change", function(){
            subtotalxprod(cartProducts);
            subtotal(cartProducts);
            nueCostoEnvio(cartProducts);
            totalEnv();
            forPago();
        });

        const botonBorrar = document.querySelectorAll(".buttonDelete"); 
        botonBorrar.forEach(clicBoton => {
            clicBoton.addEventListener('click', function(){
                
                $(this).parents('.borrable').remove();
                
                let index = $(this).attr('id').slice(-1);
                appendAux +=`
                    <div id="divAux" style="display: none;">
                    <input name="inputNum" min="0" onchange="" class="form-control inputNum ipert" type="number" value="0" id="inpId_${cosito}">
                    <p id="pId_${index}"></p>
                    </div>
                `
                document.getElementById("itemAux").innerHTML = appendAux;
                recalcular(cartProducts)
            });
        });
    });

    getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            buySucceded = resultObj.data.msg
        }
    });
});
