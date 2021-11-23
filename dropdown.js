// SELECT BUTTON

function OpenDropDownButton() {
  const selectButtons = document.querySelectorAll(".selectButton");
  selectButtons.forEach((selectButton) => {
    selectButton.addEventListener("click", (e) => {
      selectButton.style.display = "none";
      selectButton.nextSibling.nextSibling.style.display = "block";
      switch (selectButton.getAttribute("type")) {
        case "ingredient":
          getIngredientsFromData(recipes);
          listOfIngredients.style.display = "grid";
          break;
        case "appareils":
          getAppareilsFromData(recipes);
          listOfAppareils.style.display = "grid";
          break;
        case "ustensils":
          getUstensilesFromData(recipes);
          listOfUstensiles.style.display = "grid";
          break;
      }
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
        listOfIngredients.style.display = "none";
        listOfAppareils.style.display = "none";
        listOfUstensiles.style.display = "none";
      });
      selectButtons.forEach((selectButton) => {
        selectButton.style.display = "block";
      });
    });
  });
}

closeDropDownButton();

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
  finalIngredient.forEach((ingredient) => {
    listOfIngredients.innerHTML += `
    <li class="item">${ingredient}</li>
    `;
  });
}

function getAppareilsFromData(recipes) {
  const listOfAppareils = document.getElementById("listOfAppareils");
  let allAppareils = [];
  recipes.forEach((recipe) => {
    let appareil = recipe.appliance;
    allAppareils.push(appareil);
  });

  let finalAppareils = [...new Set(allAppareils)];
  finalAppareils.forEach((appareil) => {
    listOfAppareils.innerHTML += `
    <li class="item">${appareil}</li>
    `;
  });
}
getAppareilsFromData(recipes);

function getUstensilesFromData(recipes) {
  const listOfUstensiles = document.getElementById("listOfUstensiles");
  let allUstensils = [];
  recipes.forEach((recipe) => {
    let ustensilsList = recipe.ustensils;
    ustensilsList.forEach(function (ustensilList) {
      allUstensils.push(ustensilList);
    });
  });

  const finalUstensils = [...new Set(allUstensils)];
  finalUstensils.forEach((ustensil) => {
    listOfUstensiles.innerHTML += `
    <li class="item">${ustensil}</li>
    `;
  });
}

getUstensilesFromData(recipes);
