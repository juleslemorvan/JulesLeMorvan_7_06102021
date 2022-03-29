let searchString = "";

// GET INGREDIENTS IN RECIPES

let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

// SEARCH BAR

const searchBar = document.getElementById("searchInput");
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;

  if (searchString.length >= 3 || searchString.length === 0) {
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
  }
});

// GET ALL RECIPES

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.innerHTML = "";
  document.getElementById("nb-result").innerHTML =
    recipes.length > 1
      ? `${recipes.length} recettes trouvées`
      : recipes.length === 1
      ? "1 recette trouvée"
      : "Aucune recette trouvée";

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
            <li><div class="ingredientName">${ingredient}: </div>${
                 quantity ? quantity : " "
               } ${unit ? unit : " "}</li>
            `;
             })
             .join(" ")}
           </ul>
           `;
}
