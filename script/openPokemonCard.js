function clearPokemonCardContainer() {
    document.getElementById('openPokemonCardContainer').innerHTML = '';
}

async function openPokemonCard(pokemon_ID) {
    document.getElementById('openPokemonCard').classList.remove('d-none');
    document.getElementById('body').classList.add('noFlowByOpenCard');
    await loadOpenPokemonCardInfos(pokemon_ID);
}

async function loadOpenPokemonCardInfos(pokemon_ID){
    let responseAsJson = await loadFromServer(pokemon_ID);
    let id = responseAsJson['id'];
    let picture = responseAsJson['sprites']['other']['dream_world']['front_default'];
    let formattedID = formatID(id);
    let name = capitalizeFirstLetter(responseAsJson['name']);
    let background = capitalizeFirstLetter(responseAsJson['types'][0]['type']['name']);

    renderOpenPokemonCard(id,formattedID,name,picture);
    renderOpenPokemonCardBackground(background);
    renderOpenPokemonCardBaseStats(id)
}

function renderOpenPokemonCardBackground(background){
    document.getElementById('openPokemonCard_background').classList.add('pokemonCardBackground_' + background);
}

function renderOpenPokemonCard(id,formattedID,name,picture){
    document.getElementById('openPokemonCard').innerHTML = templateOpenPokemonCard(id,formattedID,name,picture);
}

async function renderOpenPokemonCardBaseStats(pokemon_ID) {
    clearPokemonCardContainer();
    document.getElementById('openPokemonCardContainer').innerHTML = templateOpenPokemonCardBaseStats();
    renderPokemonBaseStatsWithStatusBar(pokemon_ID);
}

async function renderPokemonBaseStatsWithStatusBar(pokemon_ID) {
    let responseAsJson = await loadFromServer(pokemon_ID);
    let StatusBarNames = ['HP', 'Attack', 'Defense', 'Sp-Atk', 'Sp-Def', 'Speed'];

    for (let index = 0; index < 6; index++) {
        const StatusBarName = StatusBarNames[index];
        const StatusBarValue = responseAsJson['stats'][index]['base_stat'];
        let backgroundColor = checkBackgroundColor(StatusBarValue);
        renderStatusBarNames(StatusBarName);
        renderStatusBar(StatusBarValue, backgroundColor);
    }
}

function checkBackgroundColor(StatusBarValue) {
    if (StatusBarValue < 45) {backgroundColor = 'StatusBarColorRed'} 
    else if (StatusBarValue < 70) {backgroundColor = 'StatusBarColorOrange'} 
    else if (StatusBarValue <= 100) {backgroundColor = 'StatusBarColorGreen'};
    return backgroundColor;
}

function renderStatusBarNames(StatusBarName) {
    document.getElementById('StatusBarName').innerHTML += templateStatusBarNames(StatusBarName);
}

function renderStatusBar(StatusBarValue, backgroundColor) {
    document.getElementById('StatusBar').innerHTML += templateStatusBar(StatusBarValue,backgroundColor);
}

async function renderOpenPokemonCardTypes(pokemon_ID) {
    let responseAsJson = await loadFromServer(pokemon_ID);
    let types = responseAsJson['types'];

    clearPokemonCardContainer();
    document.getElementById('openPokemonCardContainer').innerHTML = templateOpenPokemonCardHeadline();
    for (let index = 0; index < types.length || index < 1; index++) {
        let type = capitalizeFirstLetter(types[index]['type']['name']);
        document.getElementById('openPokemonCardContainer').innerHTML += templateOpenPokemonCardTypes(type);
    }
}

async function renderOpenPokemonCardInfos(pokemon_ID) {
    let responseAsJson = await loadFromServer(pokemon_ID);
    let weight = responseAsJson['weight'];
    let height = responseAsJson['height'];

    clearPokemonCardContainer();
    document.getElementById('openPokemonCardContainer').innerHTML += templateOpenPokemonCardInfos(weight,height);
    renderAbilities(pokemon_ID);
}

async function renderAbilities(pokemon_ID){
    let responseAsJson = await loadFromServer(pokemon_ID);
    let abilities = responseAsJson['abilities'];

    for (let index = 0; index < abilities.length || index < 1; index++) {
        ability = capitalizeFirstLetter(abilities[index]['ability']['name']);
        document.getElementById('abilities').innerHTML += templateAbilities(ability);
    }
}

function closePokemonCard() {
    document.getElementById('openPokemonCard').classList.add('d-none');
    document.getElementById('body').classList.remove('noFlowByOpenCard');
}