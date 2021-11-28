$( document ).ready(function() {
    
    console.log( "ready!" );
    
    let sun = "";
    let water = "";
    let pets = "";
    
    let selects = document.querySelectorAll(".filter-select");
    
    selects.forEach(function(elem){
        
        elem.addEventListener("change", function(){
            
            if(elem.id == "sun"){
                sun = elem.value;
            }else if(elem.id == "water"){
                water = elem.value;
            }else if(elem.id == "pets"){
                if(elem.value == "true"){
                    pets = true;
                }else{
                    pets = false;
                }
            }
            
            if(sun != "" && water != "" && pets != ""){
                getFilteredElements(sun, water, pets);
                
            }
        });
        
    })
    

    
});




function getFilteredElements(sun = null, water = null, pets = null){
    
    if(sun == null || water == null || pets == null){
        
        /*Fiz isso pois a API não aceita valores nulos*/
        console.log("Todos os campos devem ser preenchidos");
        return null;
        
    }else{
        let theUrl = `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`;

        $.get({
            url: theUrl,
            success: function(data){
//                console.log(data);
                
                if(innerWidth > 992){
                    renderElements(data);
                }else{
                    renderMobileElements(data);
                }
            },
            error: function(request, status, error){
                console.log(request.responseText);
            }
        });
    }

}

function renderElements(items){
    let container = document.querySelector("#results-list");
    container.innerHTML = '';
    if(items && items.length > 0){
        document.querySelector("#results").classList.remove("hide");
        document.querySelector("#empty").classList.add("hide");
        
        container.innerHTML = `
        <div class="results-list-item big">
            <div class="image">
                <img src="${items[0].url}" alt="${items[0].name}">
            </div>
            <div class="title">
                <h4>${items[0].name}</h4>
            </div>
            <div class="info">
                <p>${items[0].price}</p>
                <div class="icons">
                    <img src="/assets/images/icons/${items[0].toxicity ? 'toxic' : 'pet'}.svg">
                    <img src="/assets/images/icons/${items[0].sun}-sun.svg">
                    <img src="/assets/images/icons/${items[0].water == 'rarely' ? '1-drop' : (items[0].water == 'daily' ? '2-drops' : '3-drops')}.svg">
                </div>
            </div>
        </div>`;
        
        if(items.length > 1){
            let block1 = '';
            console.log(items.length);
            for(let i = 1; (i < items.length && i < 5); i++){
                
                block1 += `
                <div class="results-list-item">
                    <div class="image">
                        <img src="${items[i].url}" alt="${items[i].name}">
                    </div>
                    <div class="title">
                        <h4>${items[i].name}</h4>
                    </div>
                    <div class="info">
                        <p>$25</p>
                        <div class="icons">
                            <img src="/assets/images/icons/${items[i].toxicity ? 'toxic' : 'pet'}.svg">
                            <img src="/assets/images/icons/${items[i].sun}-sun.svg">
                            <img src="/assets/images/icons/${items[i].water == 'rarely' ? '1-drop' : (items[i].water == 'daily' ? '2-drops' : '3-drops')}.svg">
                        </div>
                    </div>
                </div>`;
                
                
            }
            
            container.innerHTML += `
            <div class="results-list-block block-1" id="block-1">
                ${block1}
            </div>`;
            
            
            if(items.length > 5){
                let block2 = '';
                for(let i = 5; i < items.length; i++){
                    block2 += `
                    <div class="results-list-item">
                        <div class="image">
                            <img src="${items[i].url}" alt="${items[i].name}">
                        </div>
                        <div class="title">
                            <h4>${items[i].name}</h4>
                        </div>
                        <div class="info">
                            <p>$25</p>
                            <div class="icons">
                                <img src="/assets/images/icons/${items[i].toxicity ? 'toxic' : 'pet'}.svg">
                                <img src="/assets/images/icons/${items[i].sun}-sun.svg">
                                <img src="/assets/images/icons/${items[i].water == 'rarely' ? '1-drop' : (items[i].water == 'daily' ? '2-drops' : '3-drops')}.svg">
                            </div>
                        </div>
                    </div>`;
                }
                
                container.innerHTML += `
                <div class="results-list-block block-2" id="block-2">
                    ${block2}
                </div>`;
            }
        }
        
    }else{
        document.querySelector("#results").classList.add("hide");
        document.querySelector("#empty").classList.remove("hide");
    }
    
};

function renderMobileElements(items){
    let container = document.querySelector("#results-list");
    container.innerHTML = '';
    
    if(items && items.length > 0){
        document.querySelector("#results").classList.remove("hide");
        document.querySelector("#empty").classList.add("hide");
        
        for(let i = 0; i < items.length; i++){
            container.innerHTML += `
                <div class="results-list-item">
                    <div class="image">
                        <img src="${items[i].url}" alt="${items[i].name}">
                    </div>
                    <div class="title">
                        <h4>${items[i].name}</h4>
                    </div>
                    <div class="info">
                        <p>$25</p>
                        <div class="icons">
                            <img src="/assets/images/icons/${items[i].toxicity ? 'toxic' : 'pet'}.svg">
                            <img src="/assets/images/icons/${items[i].sun}-sun.svg">
                            <img src="/assets/images/icons/${items[i].water == 'rarely' ? '1-drop' : (items[i].water == 'daily' ? '2-drops' : '3-drops')}.svg">
                        </div>
                    </div>
                </div>`;
        }
    }
}