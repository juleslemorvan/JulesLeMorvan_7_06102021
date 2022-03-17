let searchString = "";

// GET INGREDIENTS IN RECIPES

let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

// SEARCH BAR

const searchBar = document.getElementById("searchInput");
searchBar.addEventListener("keyup", (e) => {
  var t0 = performance.now();
  const searchString = e.target.value;
  const filterRecipe = recipes.filter((recipe) => {
    const isInIngredients =
      recipe.ingredients.filter(({ ingredient }) =>
        ingredient.toLowerCase().includes(searchString.toLowerCase())
      ).length > 0;

    const isInUstensils =
      recipe.ustensils.filter((ustensil) =>
        ustensil.toLowerCase().includes(searchString.toLowerCase())
      ).length > 0;

    const isInName = recipe.name
      .toLowerCase()
      .includes(searchString.toLowerCase());

    const isInAppliance = recipe.appliance
      .toLowerCase()
      .includes(searchString.toLowerCase());

    return isInName || isInAppliance || isInUstensils || isInIngredients;
  });

  displayRecipes(filterRecipe);
  var t1 = performance.now();
  console.log(
    "L'appel de doSomething a demandé " + (t1 - t0) + " millisecondes."
  );
});

// GET ALL RECIPES

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.innerHTML = "";
  document.getElementById("nb-result").innerHTML = recipes.length;
  recipes.forEach(({ img, name, time, ingredients, description }) => {
    recipeContainer.innerHTML += `
  <figure class="recipe" id="recipe">
      <a class="recipe_link">
        <div class="recipe__imgContainer">
          <img src="${img}" class="recipe__img">
             </div>
             <figcaption class="description">
                 <div class="description__title">${name} <div class="time">${time} <i class="far fa-clock"></i></div></div>
                 <div class="description__element">
                  ${displayingredients(ingredients)}
                 <p class="preparation">${description}</p>
                 </div>
             </figcaption>
        </a>
  </figure>
  `;
  });
}

displayRecipes(recipes);

function displayingredients(ingredients) {
  return `
           <ul class="ingredientsList">
           ${ingredients
             .map(({ ingredient, quantity, unit }) => {
               return `
            <li>${ingredient} ${quantity ? quantity : " "} ${
                 unit ? unit : " "
               }</li>
            `;
             })
             .join(" ")}
           </ul>
           `;
}
