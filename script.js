console.log(recipes);

const searchBar = document.getElementById("searchInput");
let searchString = "";

// GET INGREDIENTS IN RECIPES

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
  console.log(filterRecipe);
  displayRecipes(filterRecipe);
});

// Question :

// unit => undefined

// nombre de recette trouvé ?

// filter par tag ?
