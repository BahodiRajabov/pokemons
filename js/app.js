// document.body.style.marginLeft =
//   document.querySelector(".sidebar").offsetWidth + "px";

// // set megin top on tablet and mobile mode
// document.body.style.marginTop =
//   document.querySelector(".header").offsetHeight + "px";

//Pokemon classes from DOM
let elSearchResult = $_(".js-pokemons-result-list");
let elSearchResultCount = $_(".js-result__title-count");
let elPokemonTemplate = $_(".js-pokemon-template").content;


// let elPokemonBookmarkButton = $_(".js-pokemon__bookmark");
// let elPokemonLink = $_(".js-pokemon__link");
// let elPokemonimg = $_(".js-pokemon__img");
// let elPokemonName = $_(".js-pokemon__name");
// let elPokemonFeatures = $_(".js-pokemon__features");
// let elPokemonHeight = $_(".js-pokemon__height");
// let elPokemonWeight = $_(".js-pokemon__weight");

// Search form elements
let elForm = $_(".js-search__form");
let elFormInput = $_(".js-search__input");
//Categories

let elCategoriesList = $_(".categories__list")
let elCategoriesItems = $$_(".categories__item")

let searchedCategory;
let bookmarkPokemons = [];
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

let countOfResult = (pokemonArray) => {
  elSearchResultCount.textContent = pokemonArray.length === 0 ? "Topilmadi 🙁" : `${pokemonArray.length} ta`
}

let displayPokemonCards = (elList, arrayPokemons) => {
  elList.innerHTML = ""
  countOfResult(arrayPokemons)
  let elPokemonsFragment = document.createDocumentFragment();
  arrayPokemons.forEach((pokemon) => {
    elPokemonsFragment.appendChild(createCardPokemon(pokemon));
  });

  elList.appendChild(elPokemonsFragment);
};

let searchPokemons = (text, pokemonsArray, category = "all") => {
  let textRegex = new RegExp(text, "gi");
  return pokemonsArray.filter((pokemon) => {
    let matchCategory = category === "all" || pokemon.type.includes(category);
    return pokemon.name.match(textRegex) && matchCategory
  });
};

// Event listeners

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let inputValue = elFormInput.value;
  displayPokemonCards(elSearchResult, searchPokemons(inputValue, pokemons, searchedCategory));
});

elFormInput.addEventListener("input", (evt) => {
  let inputValue = evt.target.value;

  displayPokemonCards(elSearchResult, searchPokemons(inputValue, pokemons, searchedCategory));

});

elCategoriesList.addEventListener("click", (evt) => {
  evt.preventDefault()
  if (evt.target.matches(".categories__link")) {
    let inputValue = elFormInput.value;

    searchedCategory = evt.target.dataset.type;

    elCategoriesItems.forEach((a) => {
      a.setAttribute("class", "categories__item")
    })

    evt.target.parentNode.setAttribute("class", "categories__item categories__item--active");
    console.log(searchPokemons(inputValue, pokemons, searchedCategory));
    console.log(inputValue);
    displayPokemonCards(elSearchResult, searchPokemons(inputValue, pokemons, searchedCategory));
  }
})