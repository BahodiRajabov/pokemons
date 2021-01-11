// document.body.style.marginLeft =
//   document.querySelector(".sidebar").offsetWidth + "px";

// // set megin top on tablet and mobile mode
// document.body.style.marginTop =
//   document.querySelector(".header").offsetHeight + "px";

//Pokemon classes from DOM
let elSearchResult = $_(".js-pokemons-result-list");
let elSearchResultCount = $_(".js-result__title-count");
let elPokemonTemplate = $_(".js-pokemon-template").content;
let elPokemonType = $_(".js-type-pokemon-template").content;
let elTypeList = $_(".categories__list");


// let elPokemonBookmarkButton = $_(".js-pokemon__bookmark");
// let elPokemonLink = $_(".js-pokemon__link");
// let elPokemonimg = $_(".js-pokemon__img");
// let elPokemonName = $_(".js-pokemon__name");
// let elPokemonFeatures = $_(".js-pokemon__features");
// let elPokemonHeight = $_(".js-pokemon__height");
// let elPokemonWeight = $_(".js-pokemon__weight");


var types = [];

for (var pokemon of pokemons) {
  for (var type of pokemon.type) {
    if (!types.includes(type)){
      types.push(type);
    };
  };
};

let typeFragment = document.createDocumentFragment();

types.map((type) => {
  var typeItem = elPokemonType.cloneNode(true);
  typeItem.querySelector(".categories__link").textContent = type;
  typeItem.querySelector(".categories__link").dataset.type = type.toLowerCase();

  typeFragment.appendChild(typeItem);
})

elTypeList.appendChild(typeFragment);

// Search form elements
let elForm = $_(".js-search__form");
let elFormInput = $_(".js-search__input");

let createCardPokemon = (pokemon) => {
  let elPokemonTemplateClone = elPokemonTemplate.cloneNode(true);
  let elFeatures = $_(".js-pokemon__features", elPokemonTemplateClone);

  $_(".js-pokemon__img", elPokemonTemplateClone).src = pokemon.img;
  $_(".js-pokemon__name", elPokemonTemplateClone).textContent = pokemon.name;
  $_(".js-pokemon__height", elPokemonTemplateClone).textContent = pokemon.height;
  $_(".js-pokemon__weight", elPokemonTemplateClone).textContent = pokemon.weight;

  pokemon.type.forEach((typePokemon) => {
    elFeatures.appendChild(createElement("li", "pokemon__feature", typePokemon))
  });

  return elPokemonTemplateClone;
};

let displayPokemonCards = (elList, arrayPokemons) => {
  elList.innerHTML = ""
  let elPokemonsFragment = document.createDocumentFragment();
  arrayPokemons.forEach((pokemon) => {
    elPokemonsFragment.appendChild(createCardPokemon(pokemon));
  });

  elList.appendChild(elPokemonsFragment);
};

let searchPokemons = (text, pokemonsArray) => {
  let textRegex = new RegExp(text, "gi");
  // || pokemon.type.includes(text)
  return pokemonsArray.filter((pokemon) => pokemon.name.match(textRegex));
};

// displayPokemonCards(elSearchResult, pokemons.slice(0, 10))


// Event listeners

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let inpurValue = elFormInput.value;
  console.log(pokemons);
  let searchedPokemons = searchPokemons(inpurValue, pokemons);
  displayPokemonCards(elSearchResult, searchedPokemons);
});

elFormInput.addEventListener("input", (evt) => {
  let inpurValue = evt.target.value;
  if (inpurValue) {
    let searchedPokemons = searchPokemons(inpurValue, pokemons);
    displayPokemonCards(elSearchResult, searchedPokemons);
  } else {
    elSearchResult.innerHTML = ""
  }
});
