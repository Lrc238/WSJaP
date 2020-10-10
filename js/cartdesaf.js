var cartProducts = []
var appendArt = []
var inpId = ""
var counter = []
var arts = 0
var subTotal = 0
var subTotaldolar = 0
var subTotalpesos = 0
var subT = 0
var costEnvxTipo = 0
var nueSubTotaldolar = 0
var nueSubTotalpesos = 0

function mostrarArtículos(array){
    let cartInfo = array;
    let cartItems = cartInfo.articles

    
    
        for (let i = 0; i < cartItems.length; i++){

            arts += 1
            // counter.push(i)
            var inpId = "inpId_" + i;
            var pId = "pId_" + i;
            // console.log(counter)

            appendArt +=`
            <div class="row border border-dark rounded my-1">
                <div class="col-2 my-auto"><img class="rounded mx-auto d-block my-1" style="height: 100px;" src="${cartInfo.articles[i].src}" alt=""></div>
                <div class="col-3 border-left border-dark my-auto"><p>${cartInfo.articles[i].name}</p></div>
                    <div class="col-2 border-left border-dark my-auto">
                        <div class="row">  
                            <div class="col-2 my-auto"><p>${cartInfo.articles[i].currency}</p></div>
                            <div class="col-3 my-auto ml-2"><p>${cartInfo.articles[i].unitCost}</p></div>
                            <div class="col-6 my-auto"></div>
                        </div>
                    </div>
                <div class="col-2 border-left border-dark my-auto"><input name="inputNum" onchange="" class="form-control inputNum ipert" type="number" value="1" id="${inpId}"></div>
                <div class="col-3 border-left border-dark my-auto">
                    <div class="row"> 
                        <div class="col-1"><strong><p>${cartInfo.articles[i].currency}</p></strong></div>
                        <div class="col-2 ml-2"><strong><p id="${pId}"></p></strong></div>
                        <div class="col-8"></div>
                    </div>
                </div> 
            </div>
            `

            if (cartInfo.articles[i].currency === "USD"){
                subTotal += cartInfo.articles[i].unitCost*40
                subTotaldolar += cartInfo.articles[i].unitCost*40

            } else{
                subTotal += cartInfo.articles[i].unitCost
                subTotalpesos += cartInfo.articles[i].unitCost
            }


            
        }
        document.getElementById("itemRow").innerHTML = appendArt;
        
        for (let f = 0; f < cartItems.length; f++){
        var var1 = document.getElementById("inpId_"+f)
        // console.log(var1.value)
        document.getElementById("pId_"+f).innerHTML = cartInfo.articles[f].unitCost * var1.value;
        }

        document.getElementById("subT").innerHTML = "UYU "+ subTotal;
        costoEnvio();

        let subT = subTotaldolar + subTotalpesos
        document.getElementById("subT").innerHTML = "UYU "+ subT;
 
        totalEnv()
}

function changeSubtotalXprod(n,array){
    let cartInfo = array
    var var1 = document.getElementById("inpId_"+n);
    var subTotalxprod = cartInfo.articles[n].unitCost * var1.value
    document.getElementById("pId_"+n).innerHTML = subTotalxprod;
}

function costoEnvio(){
    var seleccion = document.getElementsByName('publicationType');
    for(i=0; i<seleccion.length; i++){
        if(seleccion[i].checked){
        var seleccion=seleccion[i].value;
        }
        var subitex = subTotaldolar + subTotalpesos
        var costEnvxTipo = subitex * seleccion
        document.getElementById("costEnv").innerHTML = "UYU "+ costEnvxTipo.toFixed(0);
    }
}

function nueCostoEnvio(){
    var seleccion = document.getElementsByName('publicationType');
        for(i=0; i<seleccion.length; i++){
            if(seleccion[i].checked){
            var seleccion=seleccion[i].value;
        }
        let coso = nueSubTotaldolar + nueSubTotalpesos
        var costEnvxTipo = coso * seleccion
        console.log(coso)
        document.getElementById("costEnv").innerHTML = "UYU "+ costEnvxTipo.toFixed(0);
    }
}

function nueSubt(valImputsSumado, array){
// function changeSubT(n,array){
    let cartInfo = array
    let var2 = 0
    let numero = valImputsSumado

    // console.log(cartInfo)
    // console.log(numero)

    for (let n = 0; n<cartInfo.articles.length; n++){
        var2 = document.querySelector('#inpId_'+n)
        if (cartInfo.articles[n].currency === "USD"){
            nueSubTotaldolar = cartInfo.articles[n].unitCost*40*var2.value
            
        } else{
            nueSubTotalpesos = cartInfo.articles[n].unitCost*var2.value
        }
    }
    
    var subT = nueSubTotaldolar + nueSubTotalpesos
    document.getElementById("subT").innerHTML = "UYU "+ subT;
}

function totalEnv(){
    let b = Number(document.getElementById("subT").textContent.replace('UYU ',''));
    let a = Number(document.getElementById("costEnv").textContent.replace('UYU ',''));
    let tot = a+b
    document.getElementById("totalEnv").innerHTML = tot
}

function finCompra(){
    let calle = document.getElementById('Calle').value
    let numero = document.getElementById('Numero').value
    let esquina = document.getElementById('esquin').value
    alert("Compra realizada con exito! envíaremos tus productos a "+calle+" "+numero +", esq. "+ esquina);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFODESAF_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                cartProducts = resultObj.data;
                // console.log(cartProducts.articles[0].name)
                mostrarArtículos(cartProducts)
                
                costoEnvio()
            }

    

            document.addEventListener("change", function(){
                 for (let n = 0; n<cartProducts.articles.length; n++){
                     changeSubtotalXprod(n,cartProducts);
                    }
                    nueCostoEnvio()
                    totalEnv();
             });

             
            const inputsItems = document.querySelectorAll(".ipert");
            inputsItems.forEach(clickearInputItem => {
                clickearInputItem.addEventListener('change', inputItemChanged);
            });

    });

    
});


function inputItemChanged(event){
    var val_total = 0
    $(".ipert").each(
    function(index, value) {
        if ( $.isNumeric( $(this).val() ) ){
        val_total = val_total + eval($(this).val());
        }
    }
    );
        // console.log(val_total);
        nueSubt(val_total, cartProducts);
}
