"use strict";

/** Variables declarations */
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const buttonsOpenModal = document.querySelectorAll(".show-modal");

/** Functions declarations */
function showModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

/** Code */
buttonsOpenModal.forEach((button) => {
  button.addEventListener("click", showModal);
});

btnCloseModal.addEventListener("click", hideModal);

overlay.addEventListener("click", hideModal);

document.addEventListener("keyup", (e) => {
  if (e.key ===  "Escape" && !modal.classList.contains("hidden")) hideModal();  
});
