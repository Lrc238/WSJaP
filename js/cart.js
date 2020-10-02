var cartProducts = []
var appendArt = []
// id contardor articulos itemCount
var inpId = ""
var counter = []


function mostrarArtículos(array){
    let cartInfo = array;
    let cartItems = cartInfo.articles

    
    
        for (let i = 0; i < cartItems.length; i++){

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
                <div class="col-2 border-left border-dark my-auto"><input name="inputNum" class="form-control" type="number" value="1" id="${inpId}"></div>
                <div class="col-3 border-left border-dark my-auto">
                    <div class="row"> 
                        <div class="col-1"><strong><p>${cartInfo.articles[i].currency}</p></strong></div>
                        <div class="col-2 ml-2"><strong><p id="${pId}"></p></strong></div>
                        <div class="col-8"></div>
                    </div>
                </div> 
            </div>
            `
            
        }
        document.getElementById("itemRow").innerHTML = appendArt;
        
        for (let f = 0; f < cartItems.length; f++){
        var var1 = document.getElementById("inpId_"+f)
        // console.log(var1.value)
        document.getElementById("pId_"+f).innerHTML = cartInfo.articles[f].unitCost * var1.value;
        
        }
}


function changeSubtotal(n,array){
    let cartInfo = array
    var var1 = document.getElementById("inpId_"+n)
    document.getElementById("pId_"+n).innerHTML = cartInfo.articles[n].unitCost * var1.value;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                cartProducts = resultObj.data;
                // console.log(cartProducts.articles[0].name)
                mostrarArtículos(cartProducts)
            }
            
            

            document.getElementById("inpId_0").addEventListener("change", function(){
                for (let n = 0; n<cartProducts.articles.length; n++){
                    changeSubtotal(n,cartProducts);
                    }
            });

            document.getElementById("inpId_1").addEventListener("change", function(){
                for (let n = 0; n<cartProducts.articles.length; n++){
                    changeSubtotal(n,cartProducts);
                    }
            });

                
          
        
        
    });
});