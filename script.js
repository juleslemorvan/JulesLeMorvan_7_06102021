const searchBar = document.getElementById("searchInput");
let searchString = "";

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

// SEARCH BAR

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filterRecipe = recipes.filter((recipe) => {
    const isInIngredients =
      recipe.ingredients.filter((i) =>
        i.ingredient.toLowerCase().includes(searchString.toLowerCase())
      ).length > 0;
    const isInUstensils =
      recipe.ustensils.filter((u) =>
        u.toLowerCase().includes(searchString.toLowerCase())
      ).length > 0;
    return (
      recipe.name.toLowerCase().includes(searchString.toLowerCase()) ||
      recipe.appliance.toLowerCase().includes(searchString.toLowerCase()) ||
      isInUstensils ||
      isInIngredients
    );
  });

  displayRecipes(filterRecipe);
});

// 2eme algo

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  let ingredientFiltered = [];
  allIngredient2 = [];

  for (let i = 0; i < recipes.length; i++) {
    recipe = recipes[i].ingredients;
    for (let i = 0; i < recipe.length; i++) {
      allIngredient2.push(recipe[i].ingredient);
    }
  }
  let uniqueArrIngredient = [...new Set(allIngredient2)];

  for (let i = 0; i < uniqueArrIngredient.length; i++) {
    if (
      uniqueArrIngredient[i].toLowerCase().includes(searchString.toLowerCase())
    ) {
      ingredientFiltered.push(uniqueArrIngredient[i]);
    }
  }
  // displayRecipes(recipeFiltered);
});
