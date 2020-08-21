const ORDER_ASC_BY_NAME = "AZ";
const ORDER_ASC_BY_COST = "$UP";
const ORDER_DESC_BY_COST = "$DW";
const ORDER_BY_PROD_COUNT = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var texto = undefined; // declaro una variable para el contenido del campo de busqueda

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

// mostrar la lista de productos dentro del DIV, aplicar cambios segun filtros de busqueda, campos min/max o botones de orden

function showProductsList(){

    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductsArray.length; i++){
        let category = currentProductsArray[i];
        let nombreProd = category.name.toLowerCase();        //toma el nombre del producto desde el Json y lo mete en una cariable en MINUSCULAS
        let desProd = category.description.toLowerCase();    //toma la descripcion del producto desde el Json y lo mete en una cariable en MINUSCULAS

        if (
            ((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount)) &&
            ( (desProd.indexOf(texto)) !== -1 || (nombreProd.indexOf(texto)) !== -1) //compara el contenido de los nombres y descripciones del Json letra por letra
            ){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.currency + ": " + category.cost + ` </small>
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1"></h4>
                            <small class="text-muted">` + category.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

    // ordenar alfabeticamente al iniciar la pagina o presionar "limpiar" y en el orden correspondiente al presionar los botones

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){

        sortAndShowProducts(ORDER_ASC_BY_NAME);

        document.getElementById("barraBusqueda").value = "";
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        texto = undefined;
        minCount = undefined;
        maxCount = undefined;

        filtrar();
        showProductsList();
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        
        //Obtener minimo y maximo

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        //declarar variables para filtrar por minimo y maximo

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});


//funcion para obtener el valor del campo de busqueda, siempre en minuscula y ejecutar la busqueda al presionar cada tecla

const filtrar= ()=>{
    texto = barraBusqueda.value.toLowerCase();
    showProductsList();
}
barraBusqueda.addEventListener('keyup', filtrar)
filtrar();