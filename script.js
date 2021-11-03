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
  console.log(selectIcons);

  selectIcons.forEach((selectIcon) => {
    selectIcon.addEventListener("click", (e) => {
      console.log("test");

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

console.log(recipes);

// creer un tableau
// selectionner chaque array et push chaque ingredient dans l'array sans duppliquer
