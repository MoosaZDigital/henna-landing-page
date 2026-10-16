const currentYear = new Date().getFullYear();
const yearElement = document.querySelector("#year");
yearElement.textContent = currentYear;

const faqButton = document.querySelector("#faq-button");
const faqAnswer = document.querySelector("#faq-answer");
function toggleAnswer() {
  faqAnswer.classList.toggle("hidden");
}
faqButton.addEventListener("click", toggleAnswer);
const services = ["Bridal Henna", "Party Henna", "Simple Designs"];

const faqs = [
  {
    question: "How long does henna last?",
    answer: "Usually 1 to 3 weeks, depending on your skin and aftercare.",
  },
  {
    question: "How long does a bridal design take?",
    answer: "Usually 3 to 6 hours, depending on how detailed the design is.",
  },
  {
    question: "Do you travel to events?",
    answer: "Yes, within Edmonton and surrounding areas.",
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment by contacting us by email or phone.",
  },
];

console.log(faqs.length);
console.log(faqs[0].question);
console.log(faqs[2].answer);
console.log(faqs[1]);
console.log(faqs[3]);
console.log(faqs[2].question);
console.log(faqs[3]);
