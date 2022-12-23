// Templates for pokemonCards.js

function templatePokemonCard(id, formattedID, name, picture) {
    return/*html*/`
    <div class="pokecard" onclick="openPokemonCard(${id})" id="pokecard_Background${id}">
        <div class="pokecardOverlay">
            <div class="pokecardHeader">
                <p>${formattedID}</p>
                <h3>${name}</h3>
            </div>
            <img src="${picture}">
            <div class="pokecardInfos" id="pokemoncard_Type${id}"></div>
        </div>
    </div>
    `;
}

function templatePokemonCardTypes(id, index, type) {
    return/*html*/`
    <div id="PokemonCardsType_${id}_${index}" class="items">${type}</div>
    `;
}

// Templates for openPokemonCard.js

function templateOpenPokemonCard(id, formattedID, name, picture) {
    return/*html*/` 
    <div class="openPokemonCardSub">
        <div class="openPokemonCardTop" id="openPokemonCard_background">
            <div class="openPokemonCardHeadline">
            <img src="img/icons/home.png" onclick="closePokemonCard()">
            <h2>${formattedID} ${name}</h2>
            </div>
            <img class="openPokemonCardPicture" src="${picture}">
            <div class="pokecardInfos" id="pokemoncard_Type${id}"></div>
        </div>
        <div class="openPokemonCardBottom">
            <div class="openPokemonCardMenu">
                <div class="openPokemonCardMenuItems" onclick="event.stopPropagation();renderOpenPokemonCardBaseStats(${id})">Base Stats</div>
                <div class="openPokemonCardMenuItems" onclick="event.stopPropagation();renderOpenPokemonCardInfos(${id})">Info</div>
                <div class="openPokemonCardMenuItems" onclick="event.stopPropagation();renderOpenPokemonCardTypes(${id})">Types</div>
            </div>
            <div class="openPokemonCardContainer" id="openPokemonCardContainer"></div>
        </div>
    </div>
    `;
}

function templateOpenPokemonCardBaseStats() {
    return/*html*/`
    <div class="openPokemonCardBaseStats">
        <div class="openPokemonCardInfoLine" id="StatusBarName"></div>
        <div class="openPokemonCardInfoContent" id="StatusBar"></div>
    </div>
    `;
}

function templateStatusBarNames(StatusBarName) {
    return/*html*/`
    <p>${StatusBarName}</p>
    `;
}

function templateStatusBar(StatusBarValue, backgroundColor) {
    return/*html*/`
    <div class="StatusBarMain">
        <p>${StatusBarValue}</p>
        <div class="StatusBarSub">
            <div class="StatusBarDefault ${backgroundColor}" style="width: calc(${StatusBarValue}% - 2px);"></div>
        </div>
    </div>
    `;
}

function templateOpenPokemonCardTypes(type) {
    return/*html*/`
    <div class="openPokemonCardTypes" style="margin-bottom: 16px">
        <p>${type}</p>
        <img src="img/icons/typesIcons/${type}.svg">
    </div>
    `;
}

function templateOpenPokemonCardHeadline() {
    return/*html*/`
    <h2>Types</h2>
    `;
}

function templateOpenPokemonCardInfos(weight, height) {
    return/*html*/`
    <div class="openPokemonCardInfo">
        <div>    
            <h2>Base Infos</h2>
            <p>Weight : ${weight}</p>
            <p>Height : ${height}</p>
        </div>
        <div style="margin-top:16px">
            <h2>Abilities</h2>
            <div id="abilities"></div>
        </div>
    </div>
    `;
}

function templateAbilities(ability) {
    return/*html*/`
    <p>${ability}</p>
    `;
}
