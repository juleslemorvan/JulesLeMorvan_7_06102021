// SELECT BUTTON

// Function OPEN SELECT BUTTON

function OpenDropDownButton() {
  const selectButtons = document.querySelectorAll(".selectButton");
  selectButtons.forEach((selectButton) => {
    selectButton.addEventListener("click", () => {
      selectButton.style.display = "none";
      selectButton.nextSibling.nextSibling.style.display = "block";
      switch (selectButton.getAttribute("type")) {
        case "ingredient":
          getIngredientsFromData(recipes);
          listOfIngredients.style.display = "grid";
          loadClickIngredient();
          break;
        case "appareils":
          getAppareilsFromData(recipes);
          listOfAppareils.style.display = "block";
          loadClickAppliance();
          break;
        case "ustensils":
          getUstensilesFromData(recipes);
          listOfUstensiles.style.display = "block";
          loadClickUstensil();
          break;
      }
    });
  });
}

OpenDropDownButton();

// FUNCTION CLOSE SELECT BUTTON

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

// FUNCTION GET ALL INGREDIENTS

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
    <li class="item itemIngredient">${ingredient}</li>
    `;
  });
}

function loadClickIngredient() {
  const items = document.querySelectorAll(".itemIngredient");

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      const tag = e.target.innerHTML;
      const filterTag = document.getElementById("filterTag");
      const ingredientItems = document.querySelectorAll(".ingredientItem");
      ingredientItems.forEach((ingredientItem) => {
        if (ingredientItem.innerText !== tag) {
          filterTag.innerHTML += `
      <div class="tagContainerIngredient">
      <p class="ingredientItem">${tag}</p>
      <i class="fas fa-times-circle"></i>
      </div>
      `;
          deleteTag();
        }
      });
    });
  });
}

// FUNCTION GET ALL APPLIANCE

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
    <li class="item itemAppliance">${appareil}</li>
    `;
  });
}

function loadClickAppliance() {
  const items = document.querySelectorAll(".itemAppliance");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      const tag = e.target.innerHTML;
      const filterTag = document.getElementById("filterTag");
      filterTag.innerHTML += `
      <div class="tagContainerAppliance">
      <p class="ApplianceItem">${tag}</p>
      <i class="fas fa-times-circle"></i>
      </div>
      `;
      deleteTag();
    });
  });
}

// FUNCTION GET ALL USTENSILS

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
    <li class="item itemUstensil">${ustensil}</li>
    `;
  });
}

function loadClickUstensil() {
  const items = document.querySelectorAll(".itemUstensil");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      const tag = e.target.innerHTML;
      const filterTag = document.getElementById("filterTag");
      filterTag.innerHTML += `
      <div class="tagContainerUstensil">
      <p class="UstensilItem">${tag}</p>
      <i class="fas fa-times-circle"></i>
      </div>
      `;
      deleteTag();
    });
  });
}

// FUNCTION DELETE TAG

function deleteTag() {
  const closeTagsContainer = document.querySelectorAll(".fa-times-circle");
  closeTagsContainer.forEach((closeTagContainer) => {
    closeTagContainer.addEventListener("click", () => {
      console.log("click");

      closeTagContainer.parentElement.remove();
    });
  });
}

// FILTER BY TAG

// function filterByTag(){
// const filterRecipesByTag = recipes.filter((recipe) => {
//   const isInIngredientTag = recipe.ingredients.filter((i) => {
//     i.ingredient.includes(${tag})
//   })
// })
// }
