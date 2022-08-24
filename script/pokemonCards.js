let minLoad = 1;
let maxLoad = 20;
let allPokemons = 151;

async function getScrollPosition(){
   window.onscroll = async function (){
        if(maxLoad < allPokemons){
            if (window.scrollY + window.innerHeight >= document.body.clientHeight){
                minLoad = minLoad +20;
                maxLoad = maxLoad +20;
                if (maxLoad > allPokemons){
                    maxLoad = allPokemons;}
            await loadPokemonInfos();
            }
        }
    }
}

async function loadFromServer(pokemon_ID){
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon_ID}/`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    return responseAsJson;
}

async function loadPokemonInfos(){
    for (let pokemon_ID = minLoad; pokemon_ID <= maxLoad; pokemon_ID++) {
        let responseAsJson = await loadFromServer(pokemon_ID);
        let id = responseAsJson['id'];
        let types = responseAsJson['types'];
        let picture = responseAsJson['sprites']['other']['dream_world']['front_default'];
        let formattedID = formatID(id);
        let name = capitalizeFirstLetter(responseAsJson['name']);
        let background = capitalizeFirstLetter(responseAsJson['types'][0]['type']['name']);

        await renderPokemonCard(id,formattedID,name,picture)
        await renderPokemonCardBackground(id,background);
        await renderPokemonCardTypes(id,types);
    }
}

function formatID(id){
    if (id <10){id='#00'+id;}
    if (id >=10 && id <100){id='#0'+id;}
    if (id >=100){id='#'+id;}
    return id;
}

async function renderPokemonCard(id,formattedID,name,picture){
    document.getElementById('PokemonCards').innerHTML += templatePokemonCard(id,formattedID,name,picture);
}

async function renderPokemonCardBackground(id,background){
    document.getElementById('pokecard_Background' + id).classList.add ('pokemonCardBackground_' + background);
}

async function renderPokemonCardTypes(id,types) {
    for (let index = 0; index < types.length || index < 1; index++) {
        let type = capitalizeFirstLetter(types[index]['type']['name']);
        document.getElementById(`pokemoncard_Type${id}`).innerHTML += templatePokemonCardTypes(id,index,type);
        await renderPokemonCardTypeBackground(id,index,type);
    }
}

async function renderPokemonCardTypeBackground(id,index,type) {
    document.getElementById('PokemonCardsType_' + id + '_' + index).classList.add ('pokemonCardBackground_' + type);
}