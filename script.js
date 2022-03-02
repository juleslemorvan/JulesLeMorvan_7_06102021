const searchBar = document.getElementById("searchInput");
let searchString = "";
console.log(recipes);

// GET INGREDIENTS IN RECIPES

let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

function displayingredients(ingredients) {
  return `
           <ul class="ingredientsList">
           ${ingredients
             .map(function (ingredient) {
               return `
            <li>${
              ingredient.ingredient
            } ${ingredient.quantity ? ingredient.quantity : " "} ${ingredient.unit ? ingredient.unit : " "}</li>
            `;
             })
             .join(" ")}
           </ul>
           `;
}

// GET ALL RECIPES

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.innerHTML = "";
  document.getElementById("nb-result").innerHTML = recipes.length;
  recipes.forEach((recipe) => {
    recipeContainer.innerHTML += `
  <figure class="recipe" id="recipe">
      <a class="recipe_link">
        <div class="recipe__imgContainer">
          <img src="${recipe.img}" class="recipe__img">
             </div>
             <figcaption class="description">
                 <div class="description__title">${
                   recipe.name
                 } <div class="time">${
      recipe.time
    } <i class="far fa-clock"></i></div></div>
                 <div class="description__element">
                  ${displayingredients(recipe.ingredients)}
                 <p class="preparation">${recipe.description}</p>
                 </div>
             </figcaption>
        </a>
  </figure>
  `;
  });
}
displayRecipes(recipes);

function isNotInRecipes(recipes, id) {
  let value = true;
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === id) {
      value = false;
      break;
    }
  }
  return value;
}

const matchSearch = (value, search) =>
  value.toLowerCase().includes(search.toLowerCase());

const needToAddRecipe = (recipe, search) => {
  const { ingredients, ustensils, appliance, name } = recipe;

  for (let j = 0; j < ingredients.length; j++) {
    const { ingredient } = ingredients[j];
    //  Pour ne pas repeter ingredient.ingredient
    if (matchSearch(ingredient, search)) {
      return true;
    }
  }

  for (let j = 0; j < ustensils.length; j++) {
    const ustensil = ustensils[j];
    if (matchSearch(ustensil, search)) {
      return true;
    }
  }

  return matchSearch(appliance, search) || matchSearch(name, search);
};

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const recipesFiltered = [];

  for (let i = 0; i < recipes.length; i++) {
    const currentRecipe = recipes[i];
    if (
      isNotInRecipes(recipesFiltered, currentRecipe.id) &&
      needToAddRecipe(currentRecipe, searchString)
    ) {
      recipesFiltered.push(currentRecipe);
    }
  }

  displayRecipes(recipesFiltered);
});
