const currentYear = new Date().getFullYear();
const yearElement = document.querySelector("#year");
yearElement.textContent = currentYear;

const faqButton = document.querySelector("#faq-button");
const faqAnswer = document.querySelector("#faq-answer");
function toggleAnswer() {
  faqAnswer.classList.toggle("hidden");
}
faqButton.addEventListener("click", toggleAnswer);
