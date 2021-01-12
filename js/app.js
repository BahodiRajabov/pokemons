
AOS.init();


// // set megin top on tablet and mobile mode
// document.body.style.marginTop =
//   document.querySelector(".header").offsetHeight + "px";
// Top pokemons

let elTopPokemonsList = $_(".js-top-pokemons-list")

//Pokemon classes from DOM
let elSearchResultSection = $_(".result")
let elSearchResultList = $_(".js-pokemons-result-list");
let elSearchResultCount = $_(".js-result__title-count");
let elPokemonTemplate = $_(".js-pokemon-template").content;

// bookmarked DOM ELEMENTS
let elBookmarkedPokemonsCount = $_(".js-bookmark-count")
let elBookmakredPokemonsList = $_(".js-bookmarked-pokemons")
let elBookmarkPokemonTemplate = $_(".js-bookmark-template").content;
let elToggler = $_(".js-toggler")

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
// let elCategoryTemplate = $_(".js-category-template")
let searchedCategory;

let bookmarkPokemonsLocalStorage = JSON.parse(localStorage.getItem("bookmarkPokemons"));
let globalSearchedPokemons;
let bookmarkPokemons = bookmarkPokemonsLocalStorage || [];


let updateBookmarkCaunt = () => {
  elBookmarkedPokemonsCount.textContent = bookmarkPokemons.length;
};

updateBookmarkCaunt()

let addBookmarkPokemon = (pokemon) => {
  bookmarkPokemons.push(pokemon)
  localStorage.setItem("bookmarkPokemons", JSON.stringify(bookmarkPokemons));
  updateBookmarkCaunt()
}
let removeBookmarkPokemon = (index) => {
  bookmarkPokemons.splice(index, 1)
  localStorage.setItem("bookmarkPokemons", JSON.stringify(bookmarkPokemons));
  updateBookmarkCaunt()
}

let showSection = (elSection) => {
  elSection.classList.remove("section--close")
}
let toggleMarkPokemon = (loopArray, bookmarkButton, className) => {
  loopArray.forEach((pokemon) => {
    if (pokemon.id == bookmarkButton.dataset.id) {
      let searchedPokemonIndex = bookmarkPokemons.findIndex(bookmarkPokemon => bookmarkPokemon.id === pokemon.id);
      console.log(searchedPokemonIndex);
      if (searchedPokemonIndex === -1) {
        addBookmarkPokemon(pokemon)
        bookmarkButton.classList.add(className);
      } else {
        removeBookmarkPokemon(searchedPokemonIndex)
        bookmarkButton.classList.remove(className);
      }
    }
  });
};
let createCardPokemon = (pokemon) => {
  let elPokemonTemplateClone = elPokemonTemplate.cloneNode(true);
  let elFeatures = $_(".js-pokemon__features", elPokemonTemplateClone);

  $_(".js-pokemon__img", elPokemonTemplateClone).src = pokemon.img;
  // $_(".pokemons__item", elPokemonTemplateClone).dataset.aos = "fade-up";
  $_(".pokemons__item", elPokemonTemplateClone).dataset.aosAnchorPlacement = "bottom-bottom";
  $_(".js-pokemon__name", elPokemonTemplateClone).textContent = pokemon.name;
  $_(".js-pokemon__height", elPokemonTemplateClone).textContent = pokemon.height;
  $_(".js-pokemon__weight", elPokemonTemplateClone).textContent = pokemon.weight;
  $_(".js-pokemon__bookmark", elPokemonTemplateClone).dataset.id = pokemon.id;

  bookmarkPokemons.forEach((pokemonBookmark) => {
    if (pokemonBookmark.id === pokemon.id) {
      $_(".js-pokemon__bookmark", elPokemonTemplateClone).classList.add(
        "pokemon__bookmark--active"
      );
    }
  });

  pokemon.type.forEach((typePokemon) => {
    elFeatures.appendChild(createElement("li", "pokemon__feature", typePokemon))
  });

  return elPokemonTemplateClone;
};
let createBookmarkCardPokemon = (pokemon) => {
  let elBookmarkPokemonTemplateClone = elBookmarkPokemonTemplate.cloneNode(true);
  let elFeatures = $_(".js-bookmarked-pokemon__features", elBookmarkPokemonTemplateClone);

  $_(".js-bookmarked-pokemon__img", elBookmarkPokemonTemplateClone).src = pokemon.img;
  // $_(".bookmarked-pokemons__item", elBookmarkPokemonTemplateClone).dataset.aos = "fade-up";
  // $_(".bookmarked-pokemons__item", elBookmarkPokemonTemplateClone).dataset.aosAnchor = "fade-left";
  // $_(".bookmarked-pokemons__item", elBookmarkPokemonTemplateClone).dataset.aosDuration = "500";
  // $_(".bookmarked-pokemons__item", elBookmarkPokemonTemplateClone).dataset.aosOffset = "500";
  $_(".js-bookmarked-pokemon__title", elBookmarkPokemonTemplateClone).textContent = pokemon.name;
  $_(".js-bookmarked-pokemon__height", elBookmarkPokemonTemplateClone).textContent = pokemon.height;
  $_(".js-bookmarked-pokemon__weight", elBookmarkPokemonTemplateClone).dataset.id = pokemon.weight;
  $_(".js-bookmarked-pokemons__item-remove", elBookmarkPokemonTemplateClone).dataset.id = pokemon.id;

  pokemon.type.forEach((typePokemon) => {
    elFeatures.appendChild(createElement("li", "pokemon__feature", typePokemon))
  });

  return elBookmarkPokemonTemplateClone;
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

let displayBookmarkPokemonCards = (elList, arrayPokemons) => {
  elList.innerHTML = ""
  updateBookmarkCaunt(arrayPokemons)
  let elPokemonsFragment = document.createDocumentFragment();
  arrayPokemons.forEach((pokemon) => {
    elPokemonsFragment.appendChild(createBookmarkCardPokemon(pokemon));
  });
  elList.appendChild(elPokemonsFragment);
};


// display bookmarked pokemons
displayBookmarkPokemonCards(elBookmakredPokemonsList, bookmarkPokemons)



let searchPokemons = (text, pokemonsArray, category = "all") => {
  let textRegex = new RegExp(text, "gi");
  return pokemonsArray.filter((pokemon) => {
    let matchCategory = category === "all" || pokemon.type.includes(category);
    return pokemon.name.match(textRegex) && matchCategory
  });
};
let filterTopPokemons = (pokemonsArray) => {
  return pokemonsArray.sort((pokemonA, pokemonB) => pokemonB.avgSpawns - pokemonA.avgSpawns)
}

// toggler

let openSidebar = () => {
  if (bookmarkPokemons.length > 0) {
    document.body.classList.remove("body--sidebar-close")
  } else {
    document.body.classList.add("body--sidebar-close")
  }
}

openSidebar()

let topPokemons = filterTopPokemons(pokemons).slice(0, 49);


elToggler.addEventListener("click", (evt) => {
  evt.preventDefault()
  document.body.classList.toggle("body--sidebar-close")
})

// Event listeners

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let inputValue = elFormInput.value;
  showSection(elSearchResultSection)
  displayPokemonCards(elSearchResultList, searchPokemons(inputValue, pokemons, searchedCategory));
});

elFormInput.addEventListener("input", (evt) => {
  let inputValue = evt.target.value;
  globalSearchedPokemons = searchPokemons(inputValue, pokemons, searchedCategory);
  showSection(elSearchResultSection)
  displayPokemonCards(elSearchResultList, globalSearchedPokemons);

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
    globalSearchedPokemons = searchPokemons(inputValue, pokemons, searchedCategory)
    showSection(elSearchResultSection)
    displayPokemonCards(elSearchResultList, globalSearchedPokemons);

  }
})

// bookmark listeners

elSearchResultList.addEventListener("click", (evt) => {
  evt.preventDefault()
  if (evt.target.matches(".js-pokemon__bookmark")) {
    toggleMarkPokemon(pokemons, evt.target, "pokemon__bookmark--active")
    displayBookmarkPokemonCards(elBookmakredPokemonsList, bookmarkPokemons)
    openSidebar()
  }
})

elBookmakredPokemonsList.addEventListener("click", (evt) => {
  evt.preventDefault()
  if (evt.target.matches(".bookmarked-pokemons__item-remove")) {
    console.log("Bookmark button");
    toggleMarkPokemon(pokemons, evt.target, "bookmarked-pokemons__item-remove--active")
    displayBookmarkPokemonCards(elBookmakredPokemonsList, bookmarkPokemons)
    displayPokemonCards(elTopPokemonsList, topPokemons)
    displayPokemonCards(elSearchResultList, globalSearchedPokemons)
    openSidebar()
  }
})

displayPokemonCards(elTopPokemonsList, topPokemons)

elTopPokemonsList.addEventListener("click", (evt) => {
  evt.preventDefault()
  if (evt.target.matches(".js-pokemon__bookmark")) {
    toggleMarkPokemon(pokemons, evt.target, "pokemon__bookmark--active")
    displayBookmarkPokemonCards(elBookmakredPokemonsList, bookmarkPokemons)
    openSidebar()
  }
})