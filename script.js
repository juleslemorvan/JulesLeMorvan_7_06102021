console.log(recipes);

const searchBar = document.getElementById("searchInput");
let searchString = "";

// AFFICHAGE RECETTE

function displayingredients(ingredients) {
  return `
           <ul class="ingredientsList">
           ${ingredients
             .map(function (ingredient) {
               return `
            <li>${ingredient.ingredient} ${ingredient.quantity} ${ingredient.unit}</li>
            `;
             })
             .join(" ")}
           </ul>
           `;
}

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById("recipeContainer");
  recipes.forEach((recipe) => {
    recipeContainer.innerHTML += `
  <figure class="recipe" id="recipe">
         <a class="recipe_link">
             <div class="recipe__imgContainer">
                 <img class="recipe__img">
                 </img>
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

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filterRecipe = recipes.filter((recipe) => {
    return (
      recipe.name.includes(searchString) ||
      recipe.appliance.includes(searchString)
    );
  });
  console.log(filterRecipe);
  displayRecipes(filterRecipe);
});
