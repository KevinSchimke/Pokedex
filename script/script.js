async function init() {
    await includeHTML();
    await loadPokemonInfos();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[HtmlTemplate]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("HtmlTemplate");
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

async function findPokemon() {
    let pokemon_ID = document.getElementById('input').value;
    if(pokemon_ID == '') {
        alert('Please Enter a Number');}
        else {
            document.getElementById('input').value ='';
            openPokemonCard(pokemon_ID);
        }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}