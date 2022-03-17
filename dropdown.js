// SELECT BUTTON

// Function OPEN SELECT BUTTON

function initDropDownButtons() {
  const selectButtons = document.querySelectorAll(".selectButton");
  const inputIngredient = document.getElementById(
    "form-searchIngredient-input"
  );
  inputIngredient.addEventListener("input", (e) => {
    setIngredientsFromData(e.target.value);
  });
  const inputAppliance = document.getElementById("form-searchAppareil-input");
  inputAppliance.addEventListener("input", (e) => {
    setAppliancesFromData(e.target.value);
  });
  const inputUstensil = document.getElementById("form-searchUstensile-input");
  inputUstensil.addEventListener("input", (e) => {
    setUstensilesFromData(e.target.value);
  });
  selectButtons.forEach((selectButton) => {
    selectButton.addEventListener("click", () => {
      selectButton.style.display = "none";
      selectButton.nextSibling.nextSibling.style.display = "block";
      switch (selectButton.getAttribute("name")) {
        case "ingredient":
          setIngredientFromData();
          listOfIngredients.style.display = "grid";
          break;
        case "appareils":
          setAppliancesFromData();
          listOfAppareils.style.display = "block";
          break;
        case "ustensils":
          setUstensilesFromData();
          listOfUstensiles.style.display = "block";
          break;
      }
    });
  });
}

initDropDownButtons();

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

function removeIngredient(ingredientName) {
  ingredientTags = ingredientTags.filter((value) => value !== ingredientName);
  filterRecipes();
}

function removeAppliance(applianceName) {
  applianceTags = applianceTags.filter((value) => value !== applianceName);
  filterRecipes();
}

function removeUstensil(ustensilName) {
  ustensilTags = ustensilTags.filter((value) => value !== ustensilName);
  filterRecipes();
}

// fonction qui regroupera les 3 autres
function filterRecipes() {
  const nextRecipes = recipes.filter((recipe) => {
    //Ingredients
    const hasIngredients = ingredientTags.every((filterIngredient) =>
      recipe.ingredients.some(
        (value) =>
          filterIngredient.toLowerCase() === value.ingredient.toLowerCase()
      )
    );
    //Appliances
    const hasAppliances = applianceTags.every(
      (filterAppliance) =>
        recipe.appliance.toLowerCase() === filterAppliance.toLowerCase()
    );
    //Ustensils
    const hasUstensils = ustensilTags.every((filterUstensil) =>
      recipe.ustensils.some(
        (value) => filterUstensil.toLowerCase() === value.toLowerCase()
      )
    );

    return hasIngredients && hasAppliances && hasUstensils;
  });

  displayRecipes(nextRecipes);
}

const loadClickFilter = ({ filterName, addFilter, removeFilter }) => {
  const items = document.querySelectorAll(`.${filterName}Item`);

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      const tag = e.target.innerHTML;
      const filterTag = document.getElementById("filterTag");
      let hasTag = false;
      const items = document.querySelectorAll(`.${filterName}Text`);
      items.forEach((item) => {
        if (item.innerText === tag) {
          hasTag = true;
          console.log("votre tag est deja présent");
        }
      });
      //si le tag n'existe pas :
      if (hasTag === false) {
        const icon = document.createElement("i");

        icon.onclick = () => removeFilter(tag);
        icon.className = "fas fa-times-circle";
        const tagContainer = document.createElement("div");
        tagContainer.className = `${filterName}TagContainer`;
        const text = document.createElement("p");
        text.className = `${filterName}Text`;
        text.innerHTML = tag;
        tagContainer.appendChild(text);
        tagContainer.appendChild(icon);
        filterTag.appendChild(tagContainer);

        deleteTag();
        addFilter(tag);

        filterRecipes();
      }
    });
  });
};

// FUNCTION GET ALL INGREDIENTS

function setIngredientsFromData(search = "") {
  const listOfIngredients = document.getElementById("listOfIngredients");
  listOfIngredients.innerHTML = "";
  const allIngredients = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((value) => {
      if (value.ingredient.toLowerCase().includes(search.toLowerCase())) {
        allIngredients.add(value.ingredient);
      }
    });
  });

  allIngredients.forEach((ingredient) => {
    listOfIngredients.innerHTML += `
    <li class="item ingredientItem">${ingredient}</li>
    `;
  });

  loadClickFilter({
    filterName: "ingredient",
    addFilter: (tag) => ingredientTags.push(tag),
    removeFilter: removeIngredient,
  });
}

function setAppliancesFromData(search = "") {
  const listOfAppliances = document.getElementById("listOfAppareils");
  listOfAppliances.innerHTML = "";
  const allAppliances = new Set();

  recipes.forEach((recipe) => {
    if (recipe.appliance.toLowerCase().includes(search.toLowerCase())) {
      allAppliances.add(recipe.appliance);
    }
  });

  allAppliances.forEach((appliance) => {
    listOfAppliances.innerHTML += `
    <li class="item applianceItem">${appliance}</li>
    `;
  });

  loadClickFilter({
    filterName: "appliance",
    addFilter: (tag) => applianceTags.push(tag),
    removeFilter: removeAppliance,
  });
}

function setUstensilesFromData(search = "") {
  const listOfUstensiles = document.getElementById("listOfUstensiles");
  listOfUstensiles.innerHTML = "";
  const allUstensils = new Set();

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (ustensil.toLowerCase().includes(search.toLowerCase())) {
        allUstensils.add(ustensil);
      }
    });
  });

  allUstensils.forEach((ustensil) => {
    listOfUstensiles.innerHTML += `
    <li class="item ustensilItem">${ustensil}</li>
    `;
  });

  loadClickFilter({
    filterName: "ustensil",
    addFilter: (tag) => ustensilTags.push(tag),
    removeFilter: removeUstensil,
  });
}

// FUNCTION DELETE TAG

function deleteTag() {
  const closeTagsContainer = document.querySelectorAll(".fa-times-circle");
  closeTagsContainer.forEach((closeTagContainer) => {
    closeTagContainer.addEventListener("click", () => {
      closeTagContainer.parentElement.remove();
    });
  });
}
