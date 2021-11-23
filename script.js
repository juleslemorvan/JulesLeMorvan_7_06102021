// AFFICHAGE RECETTE
console.log(recipes);

const recipeContainer = document.getElementById("recipeContainer");

const displayRecipes = (recipes) => {
  const htmlString = recipes
    .map((recipe) => {
      return `
    <figure class="recipe" id="recipe">
        <a class="recipe_link">
            <div class="recipe__imgContainer">
                <img class="recipe__img">
                </img>
            </div>
            <figcaption class="description">
                <div class=""description__title>${recipe.name} ${recipe.time}</div>
                <div class="description__element"></div>
            </figcaption>
        </a>
    </figure>
    `;
    })
    .join("");
  recipeContainer.innerHTML = htmlString;
};
