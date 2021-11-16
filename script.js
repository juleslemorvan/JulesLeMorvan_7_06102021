// SELECT BUTTON

function OpenDropDownButton() {
  const selectButtons = document.querySelectorAll(".selectButton");
  selectButtons.forEach((selectButton) => {
    selectButton.addEventListener("click", (e) => {
      console.log(selectButton.nextSibling.nextSibling);
      selectButton.style.display = "none";
      selectButton.nextSibling.nextSibling.style.display = "block";
    });
  });
}

OpenDropDownButton();

function closeDropDownButton() {
  const selectForms = document.querySelectorAll(".selectForm");
  const selectIcons = document.querySelectorAll(".chevron-up");
  const selectButtons = document.querySelectorAll(".selectButton");

  selectIcons.forEach((selectIcon) => {
    selectIcon.addEventListener("click", (e) => {
      selectForms.forEach((selectForm) => {
        selectForm.style.display = "none";
      });
      selectButtons.forEach((selectButton) => {
        selectButton.style.display = "block";
      });
    });
  });
}

closeDropDownButton();

// recipes.forEach(function (recipe) {
//   let ingredients = recipe.ingredients;

//   ingredients.forEach(function (ingredient) {

//     console.log(ingredient.ingredient);
//   });

//   // let li = document.createElement("li");
//   // li.classList.add("item");
//   // document.querySelector("listOfIngredients").appendChild(li);
// });

// recipes.forEach(function(recipe) {
//   let ingredientItem = document.createElement('li')

// })

console.log(recipes);

function getIngredientsFromData(recipes) {
  const listOfIngredients = document.getElementById("listOfIngredients");
  let allIngredient = [];
  recipes.forEach((recipe) => {
    let ingredientsList = recipe.ingredients;
    ingredientsList.forEach(function (ingredientList) {
      allIngredient.push(ingredientList.ingredient);
    });
  });

  const finalIngredient = [...new Set(allIngredient)];
  console.log(finalIngredient);
  finalIngredient.forEach((ingredient) => {
    listOfIngredients.innerHTML += `
    <li class="item">${ingredient}<li/>
    `;
  });
}

getIngredientsFromData(recipes);
