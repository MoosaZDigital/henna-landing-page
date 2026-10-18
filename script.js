const currentYear = new Date().getFullYear();
const yearElement = document.querySelector("#year");
yearElement.textContent = currentYear;

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
  {
    question: "How long does henna take to dry?",
    answer:
      "Henna typically takes 20–30 minutes to dry to the touch, although the exact time depends on the design and how much paste is applied.",
  },
];
const faqList = document.querySelector("#faq-list");
function closeAllAnswers() {
  const allAnswers = document.querySelectorAll(".faq-answer");
  for (const answer of allAnswers) {
    answer.classList.add("hidden");
  }
}

for (const faq of faqs) {
  const button = document.createElement("button");
  button.textContent = faq.question;
  button.classList.add("faq-question");

  const answer = document.createElement("p");
  answer.textContent = faq.answer;
  answer.classList.add("faq-answer", "hidden");
  button.addEventListener("click", function () {
    const wasHidden = answer.classList.contains("hidden");

    closeAllAnswers();

    if (wasHidden) {
      answer.classList.remove("hidden");
    }
  });

  faqList.append(button, answer);
}
