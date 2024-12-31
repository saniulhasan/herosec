const stars = document.querySelectorAll(".fa-star-o");
const selectedRatingValueText = document.querySelector(".selected-rating-value");
let currentRating = -1;

stars.forEach((star, index) => {
  star.dataset.rating = index + 1;
  star.addEventListener("mouseover", () => updateRating(index + 1));
  star.addEventListener("click", () => setRating(index + 1));
  star.addEventListener("mouseleave", () => updateRating(currentRating));
});

const updateRating = (rating) => {
  stars.forEach((star, index) => {
    star.classList.toggle("fa-star", index < rating);
    star.classList.toggle("fa-star-o", index >= rating);
  });
};

const setRating = (rating) => {
  currentRating = rating;
  selectedRatingValueText.textContent = currentRating;
  updateRating(currentRating);
};

