# Lesson Notes

## Current task: FAQ accordion (functions)

### Why

Right now every answer opens on its own, so many can be open at once.
In an **accordion**, opening one answer closes the others. To do that, we
need a reusable piece of code: a **function** we name ourselves.

### New concept: defining and calling a function

```js
function sayHello() {
  console.log("Hello!");
}

sayHello(); // runs it
```

- `function sayHello() { ... }` **defines** it: saves the instructions, doesn't run them.
- `sayHello();` **calls** it: actually runs it.

### New concept: `querySelectorAll`

`querySelector` finds **one** element. `querySelectorAll` finds **all** matching
elements, and you can loop over them like an array:

```js
const allAnswers = document.querySelectorAll(".faq-answer");
```

### Your task

In `script.js`, **above** your `for` loop:

1. Write a function called `closeAllAnswers`.
2. Inside it, use `querySelectorAll` to get every `.faq-answer`.
3. Loop over them with `for...of` and add the class `"hidden"` to each one.

Then, inside your click handler, **call** `closeAllAnswers()` **before** the
`toggle` line.

Hint: look at how your existing loop adds a class: `answer.classList.add(...)`.

### Test

1. Save, refresh. Click a question, then a **different** question.
   The first one should close.
2. Now **click an open question to close it.** Something goes wrong.
   Don't fix it yet: tell Claude what happened and why you think it happened.
   That bug is part 2 of this lesson.

### Part 2: the bug, and the fix

**The bug:** clicking an open question didn't close it.
`closeAllAnswers()` closed it, then `toggle("hidden")` saw it was hidden and
**opened it again**, too fast to see.

**The fix:** remember whether it was closed **before** closing everything.

```js
button.addEventListener("click", function () {
  const wasHidden = answer.classList.contains("hidden");

  closeAllAnswers();

  if (wasHidden) {
    answer.classList.remove("hidden");
  }
});
```

- `classList.contains("hidden")` gives `true` (closed) or `false` (open).
- `if (wasHidden) { ... }` runs the code inside **only if** it's `true`.
- Was closed → everything closes, then this one opens.
  Was open → everything closes, nothing reopens.

**Lesson:** the **order** of lines matters. Check a value *before* the code
that changes it.

---

## Done: loop over the FAQ list ✅

## Previous task: loop over the FAQ list and build it on the page

### Why

Your FAQ data lives in the `faqs` array, but the page still shows one
hand-typed question. Now a **loop** will go through the array and **create**
the HTML for every FAQ. Add an FAQ to the array → it appears on the page.
**Data in → something happens → screen updates.**

This is how almost every real app works: data (often from an API) is turned
into HTML by JavaScript.

### New concept: `for...of` loop

```js
for (const faq of faqs) {
  console.log(faq.question);
}
```

In plain words: "**For each** item **of** the `faqs` list, call it `faq`,
and run the steps inside `{ }`." It runs once per item: 4 FAQs → 4 times.
Each time, `faq` is the **next** object in the list.

### New concept: creating elements with JavaScript

| Code | What it does |
|---|---|
| `document.createElement("button")` | Creates a new `<button>` (not on the page yet!) |
| `element.textContent = "..."` | Sets the text inside it |
| `element.classList.add("a", "b")` | Adds classes (like writing `class="a b"`) |
| `parent.append(child)` | Puts the element **inside** `parent`, so it appears on the page |

**Why `textContent` and not `innerHTML`?** `textContent` always treats data as
plain text. That's safer: if the data ever came from a visitor or an API, it
can't sneak HTML or scripts into your page.

### New concept: anonymous function

```js
button.addEventListener("click", function () {
  answer.classList.toggle("hidden");
});
```

A function with **no name**, written right where it's needed. Each button
gets its own little function, which remembers **its own** answer.

### Step 1: HTML (in `index.html`)

In the FAQ section, **delete** the hand-typed `<button>` and answer `<p>`.
Keep the `<h2>` and the "Sample questions..." `<p>`. In their place, add an
empty box for JavaScript to fill:

```html
<div id="faq-list"></div>
```

### Step 2: JavaScript (in `script.js`)

**Delete:** the old FAQ code (`faqButton`, `faqAnswer`, `toggleAnswer`, and
its `addEventListener` line), the `services` array, and all the `console.log`
lines. **Keep:** the year code and the `faqs` array.

Then, **below** the `faqs` array, add:

```js
const faqList = document.querySelector("#faq-list");

for (const faq of faqs) {
  const button = document.createElement("button");
  button.textContent = faq.question;
  button.classList.add("faq-question");

  const answer = document.createElement("p");
  answer.textContent = faq.answer;
  answer.classList.add("faq-answer", "hidden");

  button.addEventListener("click", function () {
    answer.classList.toggle("hidden");
  });

  faqList.append(button, answer);
}
```

**Why below the array?** Top to bottom: the loop can't use `faqs` before it exists.

### Step 3: Test, and spot the layout problem

1. Refresh. Do all 4 questions appear? Do they sit **on one line**? Why?
   (Hint: buttons are **inline** elements, like links. And the answers between
   them are `display: none`, so nothing separates them.)
2. **Fix it** in your `.faq-question` CSS rule, add:

| Property | Value | What it does |
|---|---|---|
| `display` | `block` | Each question on its own line |
| `margin-top` | `12px` | Space between questions |

3. Click each question: each opens **its own** answer.
4. **Add a 5th FAQ** to the array. Refresh. It appears with no HTML changes!
5. **Where's the HTML?** Press `Ctrl + U` (view page source). Are the questions
   there? Now look in DevTools → **Elements**. Are they there? Why the difference?
6. Add, commit, push, `git status`.

---

## Done: arrays and objects ✅

## Previous task: arrays and objects (data for the FAQ)

### Why

Right now your FAQ question and answer are typed into the HTML. Next lesson,
JavaScript will **build** the FAQ from a list of data. First you need to know
how JavaScript stores lists and grouped information.

This is also exactly what data from an **API** looks like (Gate 2's goal),
so learning to read it now pays off later.

### New concept: arrays (lists)

```js
const services = ["Bridal Henna", "Party Henna", "Simple Designs"];
```

- Square brackets `[ ]`, items separated by commas.
- Each item has a **position number**, called an **index**.
  **Counting starts at 0**, not 1!

| Index | Value |
|---|---|
| `0` | `"Bridal Henna"` |
| `1` | `"Party Henna"` |
| `2` | `"Simple Designs"` |

- `services[0]` → `"Bridal Henna"`
- `services.length` → `3` (how many items)

### New concept: objects (grouped info)

```js
const faq = {
  question: "How long does henna last?",
  answer: "Usually 1 to 3 weeks, depending on your skin and aftercare.",
};
```

- Curly braces `{ }`, made of **key: value** pairs, separated by commas.
- The **key** is a label (`question`), the **value** is the data.
- Read a value with a dot: `faq.question`

**Array vs object:** an array is a numbered **list** of things. An object is
**one thing** described with labelled details.

### New concept: an array of objects

Put them together: a **list** where each item is **one FAQ**:

```js
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
];
```

**Reading it with your finger:** `faqs[1].answer`
1. `faqs` → the whole list
2. `[1]` → the **second** item (counting from 0!), the bridal question object
3. `.answer` → that object's answer → `"Usually 3 to 6 hours, ..."`

### Your task (in `script.js`)

1. At the **bottom** of `script.js`, add the `faqs` array above (you can copy it).
2. Below it, **predict first, then** log each of these and check:

| Code | Your prediction | Actual result |
|---|---|---|
| `console.log(faqs.length);` | | |
| `console.log(faqs[0].question);` | | |
| `console.log(faqs[2].answer);` | | |
| `console.log(faqs[1]);` | | |
| `console.log(faqs[3]);` | | |

3. **Challenge:** write a line that logs the **question** of the **last** FAQ.
4. **Challenge 2:** add a **fourth** FAQ object to the array (your own sample
   question and answer). Watch out for the commas between objects!
   What does `faqs.length` show now?

**Test:** no red errors in the Console. Commit when done (keep the logs
for now, we'll clean up next lesson).

---

## Done: FAQ click show/hide ✅

## Previous task: handle a click (FAQ show/hide)

### Why

Clicking things is how visitors interact with a page. In this lesson: click a
question → its answer appears. Click again → it hides.

**Division of jobs:**
- **HTML:** the question and answer exist
- **CSS:** a class `.hidden` that hides things
- **JavaScript:** decides **when** to add or remove that class

### Step 1: the HTML (in `index.html`)

Add a new `<section>` **between Gallery and Contact** with:

1. An `<h2>`: **FAQ**
2. A `<p>`: **Sample questions and answers for demonstration.**
3. A `<button>` with `id="faq-button"` and `class="faq-question"`, text:
   **How long does henna last?**
4. A `<p>` with `id="faq-answer"` and **two** classes, `faq-answer` and `hidden`, text:
   **Usually 1 to 3 weeks, depending on your skin and aftercare.**

**New concept: several classes on one element.** Separate them with a space:

```html
<p id="faq-answer" class="faq-answer hidden">...</p>
```

This element has two labels: `faq-answer` (what it is) and `hidden`
(its current state). JavaScript will add and remove `hidden`.

### Step 2: the CSS (in `style.css`, above the media query)

**Rule 1:** `.hidden`

| Property | Value | What it does |
|---|---|---|
| `display` | `none` | Removes the element from the page completely |

**Rule 2:** `.faq-question` (make the button look like a heading, not a grey box)

| Property | Value |
|---|---|
| `background` | `none` |
| `border` | `none` |
| `padding` | `0` |
| `font-family` | `inherit` |
| `font-size` | `18px` |
| `font-weight` | `bold` |
| `color` | `#8b4513` |
| `cursor` | `pointer` |

**Test:** the question shows, the answer doesn't (it has `hidden`).
Clicking does nothing yet. That's Step 3.

### New concept: functions

A **function** is a named set of steps. You **define** it once, then **run**
(call) it whenever you need it.

```js
function toggleAnswer() {
  faqAnswer.classList.toggle("hidden");
}
```

- `function` = "I'm defining a function"
- `toggleAnswer` = its name (camelCase, describes what it does: start with a verb)
- `()` = where inputs would go (none for now)
- `{ }` = the steps inside it
- Defining it does **not** run it. It just waits until it's called.

### New concept: `classList.toggle`

`element.classList.toggle("hidden")` = "if the element has the class
`hidden`, remove it; if it doesn't, add it." Like a light switch.

### New concept: event listeners

```js
faqButton.addEventListener("click", toggleAnswer);
```

In plain words: "**When** `faqButton` is **clicked**, **run** `toggleAnswer`."

- `"click"` is the **event** (other events: `"submit"`, `"input"`, `"mouseover"`)
- `toggleAnswer` **without** `()` = "here's the function, run it later, on each click"
- `toggleAnswer()` **with** `()` = "run it **now**", which is not what we want

### Step 3: the JavaScript (in `script.js`, below the year code)

```js
const faqButton = document.querySelector("#faq-button");
const faqAnswer = document.querySelector("#faq-answer");

function toggleAnswer() {
  faqAnswer.classList.toggle("hidden");
}

faqButton.addEventListener("click", toggleAnswer);
```

1. Find the button. 2. Find the answer. 3. Define what a click should do.
4. Connect the click to the function.

**Data in** (a click) → **something happens** (toggle the class) →
**screen updates** (the answer appears or disappears).

### Test

1. Click the question: the answer appears. Click again: it hides.
2. **Watch it happen:** open DevTools → **Elements** tab, find the answer `<p>`.
   Click the question several times and watch the `class` attribute change.
3. **Break it on purpose:** add `()` after `toggleAnswer` in the
   `addEventListener` line. Refresh. Is the answer visible at the start?
   Does clicking work? Can you explain why? Then remove the `()`.
4. Add, commit, push, `git status`.

### Good to know

HTML has a built-in element that does this **without** JavaScript:
`<details>` + `<summary>`. On a real project, the simplest tool that works
is often the best choice. We're building it by hand here to learn events,
which you'll need for everything else (forms, menus, API calls).

---

## Done: first JavaScript (automatic year) ✅

## Previous task: your first JavaScript (Gate 2 begins)

### Why

HTML = structure, CSS = looks, **JavaScript = behaviour**. JavaScript can
**change the page after it has loaded**: react to clicks, update text, fetch data.

The mental model for all of Gate 2: **data in → something happens → screen updates.**

Your first goal: the footer year updates by itself. In January 2027 your
footer should say 2027 without you touching it.

### Step 1: connect `script.js` (in `index.html`)

Just **before** `</body>`, add:

```html
<script src="script.js"></script>
```

- Like `<link>` connects CSS, `<script src>` connects JavaScript.
- `<script>` **does** need a closing tag, even though it's empty.
- **Why at the bottom?** The browser reads HTML from top to bottom. JavaScript
  that wants to change the footer must run **after** the footer exists.

### Step 2: say hello (in `script.js`)

```js
console.log("Hello from script.js!");
```

- `console.log(...)` prints a message to the browser's **Console**, a hidden
  panel for developers. Visitors never see it.
- Text in JavaScript goes inside quotes. Lines end with `;`.

**Test:** save, refresh, press `F12`, click the **Console** tab.
Do you see your message? If yes, your file is connected.

### New concept: variables and types

A **variable** is a labelled box that holds a value.

```js
const studioName = "Henna Studio";
const startingPrice = 20;
console.log(studioName);
console.log(typeof startingPrice);
```

- `const` = "create a box that won't be replaced" (use it by default).
  `let` = a box whose value **can** change later.
- `studioName` = the label. Style: **camelCase** (first word lowercase,
  next words start with a capital). No spaces, no dashes.
- `=` means "put this value in the box", **not** "equals".
- `typeof` tells you what **type** a value is:

| Value | Type |
|---|---|
| `"Henna Studio"` | `string` (text, always in quotes) |
| `20` | `number` (no quotes!) |
| `true` / `false` | `boolean` (yes/no) |

**Step 3 task:** in `script.js`, create the two variables above, log both,
and log the `typeof` of each. Then predict: what's `typeof "20"`? Check it.

### Step 4: the automatic year

**HTML:** in the footer, wrap the year in a `<span>` with an id:

```html
<p>&copy; <span id="year">2026</span> Henna Studio. ...</p>
```

`<span>` is like `<div>`, but for a few words **inside** a line of text.

**JavaScript:**

```js
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector("#year");
yearElement.textContent = currentYear;
```

Line by line:
1. `new Date()` = "right now"; `.getFullYear()` = "just the year". Store it.
2. `document.querySelector("#year")` = find the element with `id="year"`.
   It uses **CSS selectors**! `#` means id, like `.` means class.
3. `.textContent = ...` = replace the text inside that element.

**Data in** (today's date) → **something happens** (get the year) →
**screen updates** (the footer).

**Test:**
1. Change `2026` in the HTML to `1999`, save, refresh. The footer still says
   the current year. Why?
2. **Break it on purpose:** change `"#year"` to `"#yeer"`. Refresh, open the
   Console. Read the red error: what does it say, and which **file and line**
   does it point at? Then fix it back.
3. Add, commit, push, `git status`.

---

## Done: `.gitignore` ✅

## Previous task: keep a file private with `.gitignore`

### Why

`linkedin-posts.md` holds your draft posts. Your repo is public, so if Git
tracks it, anyone can read your drafts on GitHub (and on your live site).
Later, you'll use the same tool to keep **API keys and passwords** out of
GitHub, which really matters: bots scan GitHub for leaked keys within minutes.

### New concept: `.gitignore`

A plain text file named **exactly** `.gitignore` (starts with a dot, no
extension) in your project's main folder. Each line is a file or folder
name Git should pretend doesn't exist.

```
linkedin-posts.md
```

**Important:** `.gitignore` only works on files Git isn't tracking **yet**.
If a file was already committed, adding it to `.gitignore` doesn't remove it.
That's why we do this **before** ever committing the drafts.

### Steps

1. **Before:** run `git status`. You should see `linkedin-posts.md` under
   "Untracked files" (Git sees it, but isn't tracking it yet).
2. In VS Code, create a new file in the **main project folder** (next to
   `index.html`) named `.gitignore`.
3. Write one line in it: `linkedin-posts.md`, and save.
4. **After:** run `git status` again. What changed? Which file appears now,
   and which one disappeared?
5. Commit and push the `.gitignore` itself (it's safe to make public, and
   it should be shared):
   ```
   git add .
   git commit -m "Add .gitignore for private drafts"
   git push
   git status
   ```

### ⚠️ The trade-off

An ignored file is **not backed up** on GitHub. If your laptop dies, the
drafts are gone. Keep a copy somewhere else (OneDrive, Google Drive, email
it to yourself), or move the drafts into a LinkedIn draft or a notes app.

---

## Done: contact form ✅

## Previous task: a contact form

### Why

Right now visitors must open their email app or phone to contact you. A form
lets them send a booking request **right on the page**. Later, this form becomes
your **lead capture** (collecting potential clients' details).

For now the form is a **demo**: it won't send anything yet. Sending needs
JavaScript or a service, which comes later. So we label it honestly.

### New concepts

| Tag / attribute | What it does |
|---|---|
| `<form>` | The box that holds all the fields and the button |
| `<label>` | The visible name of a field ("Name", "Email") |
| `<input>` | A one-line field. **No closing tag** (like `<img>`) |
| `<textarea>` | A multi-line field, for the message. **Has** a closing tag |
| `<button>` | A real button. `type="submit"` means "send the form" |
| `type="email"` | The browser checks that it looks like an email (has an `@`) |
| `required` | The browser won't submit the form if this field is empty |
| `name="..."` | The name the data is sent under |
| `for` + `id` | Connect a label to its field. They must match **exactly** |

**Link vs button:** a **link** (`<a>`) takes you somewhere. A **button** does
something (send, open, close). Your "Book Now" goes somewhere, so it's
correctly a link. "Send" does something, so it's a `<button>`.

### One field, fully written

```html
<label for="name">Name</label>
<input type="text" id="name" name="name" required />
```

`for="name"` points at `id="name"`. Clicking the label then puts the cursor in
the field, and screen readers read "Name" when the field is selected (**accessibility**).

### Step 1: the HTML (in `index.html`)

In the Contact section, **below** the phone number, add:

1. A `<p>`: **Demo form: messages are not sent yet.**
2. A `<form>` containing:
   - Label **Name** + an `input` with `type="text"`, `id="name"`, `name="name"`, `required`
   - Label **Email** + an `input` with `type="email"`, `id="email"`, `name="email"`, `required`
   - Label **Message** + a `<textarea>` with `id="message"`, `name="message"`, `rows="5"`, `required`
     (`rows` = how many lines tall it starts)
   - A `<button>` with `type="submit"` and `class="button"`, text: **Send message**

```
form
├── label + input     (Name)
├── label + input     (Email)
├── label + textarea  (Message)
└── button
```

**Test the HTML** (it will look messy, that's fine, we style it in Step 2):
1. Click the word **Name**. Does the cursor jump into the Name field?
2. Click **Send message** with everything empty. What does the browser say?
3. Type `abc` in Email and try to send. What happens?
4. Fill in everything correctly and send. The page reloads. **Look at the URL
   in the address bar.** What do you see after the `?`? Where do those words come from?

### Step 2: the CSS (in `style.css`)

**New concept: several selectors at once.** A comma means "and":
`input, textarea { }` styles both inputs and textareas.

Add these rules **above** your media query (it should stay at the bottom):

**Rule 1:** `label`

| Property | Value | What it does |
|---|---|---|
| `display` | `block` | Label on its own line, above its field |
| `margin-bottom` | `4px` | Small gap between label and field |
| `font-weight` | `bold` | Easier to scan |

**Rule 2:** `input, textarea`

| Property | Value | What it does |
|---|---|---|
| `display` | `block` | Each field on its own line |
| `width` | `100%` | Full width of the column |
| `box-sizing` | `border-box` | Makes `width: 100%` **include** padding and border, so the field doesn't stick out |
| `padding` | `8px` | Space inside the field |
| `border` | `1px solid #e6d3bf` | Same soft tan as your cards |
| `border-radius` | `6px` | Rounded, like your button |
| `font-family` | `inherit` | Use the page's font (fields don't do this by default!) |
| `margin-bottom` | `16px` | Gap before the next label |

**Rule 3:** add to your existing `.button` rule (so the `<button>` looks like your Book Now link)

| Property | Value | What it does |
|---|---|---|
| `border` | `none` | Removes the browser's default grey button border |
| `font-family` | `inherit` | Same font as the page |
| `cursor` | `pointer` | The hand cursor on hover, so it feels clickable |

**Test the CSS**
1. Labels sit above their fields, fields are full width, and the button looks like Book Now.
2. **Experiment:** remove `box-sizing: border-box` and refresh. Look at the right
   edge of the fields. What happened? Put it back.
3. Check phone view.
4. Add, commit, push, `git status`.

---

## Done: media query ✅

## Previous task: a smaller title on phones (media query)

### Why

Your 48px title looks great on a computer, but on a phone it's huge and may
break onto two lines. We want **different styles for different screen sizes**.

### New concept: media query

A **media query** is a CSS rule with a condition: "**only if** the screen is
this size, use these styles."

```css
@media (max-width: 600px) {
  h1 {
    font-size: 32px;
  }
}
```

**In plain words:** "If the screen is 600px wide or less, make the `h1` 32px."

- `@media` = "here comes a condition"
- `(max-width: 600px)` = the condition: screen width is **at most** 600px
  (phones are usually 360–430px wide; computers are 1000px+)
- Inside the `{ }` you write **normal CSS rules**, so there are **two** levels of `{ }`.
  Count them carefully: every `{` needs its `}`.

### New concept: order matters (the cascade)

If two rules give the same element different values, and they're equally
specific, **the one lower in the file wins**. Your media query must therefore
come **after** your normal `h1` rule, so put it at the **very bottom** of
`style.css`. (CSS = **Cascading** Style Sheets. "Cascading" is this idea.)

### Your task (in `style.css`)

At the **bottom** of the file, add a media query for `max-width: 600px` with:

**Rule 1:** `h1`

| Property | Value | What it does |
|---|---|---|
| `font-size` | `32px` | Smaller title on phones |

**Rule 2:** `header`

| Property | Value | What it does |
|---|---|---|
| `padding` | `32px 16px` | A shorter banner, so phone visitors see more content right away |

Both rules go **inside the same** `@media { }` block.

### Test

1. Save and refresh on a normal window. **Nothing should change** (the screen
   is wider than 600px, so the condition is false).
2. Open phone view (`F12`, then `Ctrl + Shift + M`). The title should be smaller.
3. **Watch it switch:** in phone view, drag the width handle on the right
   edge of the page slowly, from narrow to wide. Watch the width number at the top.
   At **600px** the title jumps between sizes. That's your media query
   turning on and off.
4. **Break it on purpose:** move the media query to the **top** of `style.css`.
   Does it still work in phone view? Why not? Move it back.
5. Add, commit, push, then `git status`. Check your **live site** on your phone
   1–2 minutes later.

---

## Done: site is live ✅

Live link: https://moosazdigital.github.io/henna-landing-page/

## Previous task: put the site live (GitHub Pages)

### Why

Until now, the site only opens on your computer. **GitHub Pages** takes the
files in your GitHub repo and serves them as a real website, for free.
Every `git push` updates the live site automatically (after a minute or two).

### New terms

| Term | Meaning |
|---|---|
| **Hosting** | A computer that's always online and sends your files to visitors |
| **Deploy** | Putting a version of your site live |
| **URL** | A web address, e.g. `https://moosazdigital.github.io/henna-landing-page/` |

### Steps (in your browser, on github.com)

1. Open your repo: https://github.com/MoosaZDigital/henna-landing-page
2. Click **Settings** (top menu of the repo, with the gear icon).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose **main** and folder **/ (root)**, then click **Save**.
6. Wait 1–2 minutes, then refresh the Settings → Pages screen. A box appears
   at the top: **"Your site is live at ..."** with your link.

**Why `index.html` matters:** when someone visits your link, the host
automatically looks for a file called `index.html`. That's why the home page
is always named that.

### Test

1. Open your live link. You should see your site, with the photos.
2. Open it on your **real phone**.
3. If the photos are missing online but work on your computer, check the
   **uppercase/lowercase** in the file names. Your computer (Windows) ignores
   case, but web servers don't: `Henna-1.jpg` ≠ `henna-1.jpg`.

---

## Done: hero banner + side padding for phones ✅

## Previous task: a hero banner

### Why

The **hero** is the big banner at the top of a landing page. It's the first
thing visitors see, so in 3 seconds it must answer: **who is this, what do they
offer, and what should I do?** Your page already has all three pieces
(title, tagline, Book Now button). They just need to be grouped and made bold.

### Step 1: the HTML (in `index.html`)

Right now the title is in `<header>`, but the tagline and button are in `<main>`.
**Move** the tagline `<p>` and the Book Now `<p>` **into the `<header>`**,
below the `<h1>`. (Cut with `Ctrl + X`, paste with `Ctrl + V`, so you don't
retype anything.)

```
header
├── h1
├── p (tagline)
└── p (Book Now button)
```

`<header>` is the right place: it's for the introduction to the page.

Then press `Shift + Alt + F`. Your `<header>` is on one line right now; this
spreads it out so the nesting is easy to see.

### New concept: `text-align`

`text-align: center` centers the **text and inline things** (like your button)
inside a box. Compare with `margin: 0 auto`, which centers **the box itself**.

### New concept: `font-size`

Sets how big text is. `48px` is big, good for a hero title.

### Step 2: the CSS (in `style.css`)

**Rule 1:** a new rule with selector `header`

| Property | Value | What it does |
|---|---|---|
| `background-color` | `#f3e3d0` | Light tan banner, darker than the cream page |
| `text-align` | `center` | Centers the title, tagline and button |
| `padding` | `48px 16px` | Lots of space above/below, a little at the sides |
| `border-radius` | `8px` | Rounded corners, matching your cards and photos |
| `margin-top` | `16px` | A gap above, so the banner doesn't touch the top of the window |

**Rule 2:** in your **existing** `h1` rule, add:

| Property | Value | What it does |
|---|---|---|
| `font-size` | `48px` | A big, bold title |

### Test

1. Save and refresh. You should see a tan banner at the top with a big
   centered title, the tagline, and the Book Now button.
2. Click **Book Now**. It should still jump to Contact.
3. **Experiment:** change `padding` to `100px 16px`. How does the banner feel?
   Pick the value you like best.
4. Make the window narrow. Is the 48px title too big on a phone-sized window?
   Remember what you see; we'll fix that later with a new tool.
5. Add, commit, push.

---

## Done: flexbox gallery ✅

## Previous task: show the gallery photos side by side (flexbox)

### Why

Right now the 3 photos are stacked one under the other, so visitors have to
scroll a lot. On a wide screen they should sit **in a row**. On a phone they
should **stack**. This is called a **responsive layout**.

### New concept: flexbox

`display: flex` on a box turns its **children** into a row:

```
Before (normal):      After (display: flex):
┌──────────┐          ┌──────┐ ┌──────┐ ┌──────┐
│  photo 1 │          │  1   │ │  2   │ │  3   │
└──────────┘          └──────┘ └──────┘ └──────┘
┌──────────┐
│  photo 2 │
└──────────┘
   ...
```

- The box with `display: flex` is the **flex container** (the parent).
- The elements directly inside it are the **flex items** (the children).
- Flexbox only affects the **direct children**, so we need a box around
  just the 3 photos (not the `h2` and `p`).

### New concept: descendant selector

```css
.gallery img { }
```

A **space** between two selectors means "inside". This targets only `<img>`
elements **inside** something with `class="gallery"`. Other images on the page
(you'll add some later) aren't affected.

### Step 1: the HTML (in `index.html`)

Wrap your 3 `<img>` elements in a `<div class="gallery">`. The `h2` and `p`
stay outside the div.

```
section
├── h2
├── p
└── div (class="gallery")
    ├── img
    ├── img
    └── img
```

### Step 2: the CSS (in `style.css`)

**Rule 1:** selector `.gallery`

| Property | Value | What it does |
|---|---|---|
| `display` | `flex` | Puts the children in a row |
| `flex-wrap` | `wrap` | If they don't fit, move to the next line (phones!) |
| `gap` | `16px` | Space between the photos |
| `justify-content` | `center` | Centers the photos in the row |

**Rule 2:** selector `.gallery img`

| Property | Value | What it does |
|---|---|---|
| `width` | `200px` | Every photo the same width |
| `height` | `200px` | Every photo the same height (squares) |
| `object-fit` | `cover` | Fill the square **without squishing**; trims the edges instead |

Your photos have different shapes (some tall, some wide). `object-fit: cover`
makes them all neat squares without stretching them.

### Test

1. Save and refresh. The 3 photos should be squares in a row, with gaps.
2. **Experiment:** remove `object-fit: cover`, refresh. What happens to the
   photos? Put it back.
3. Make the browser window narrow. The photos should wrap onto new lines.
4. Add, commit, push.

---

## Done: Gallery section with images ✅

## Previous task: add a Gallery section with images

### Why

Henna is visual art. Photos are the most convincing part of a henna website.

### New concept: `<img>`

```html
<img src="images/bridal-henna.jpg" alt="Bridal henna design on both hands" />
```

- `<img>` has **no closing tag** (like `<meta>` and `<link>`).
- `src` ("source") = the path to the image file. Same idea as `href` in `<link>`.
- `alt` ("alternative text") = a description of the image.

### Why `alt` matters

- **Screen readers** read the `alt` text aloud to blind visitors (**accessibility**).
- If the image fails to load, the `alt` text shows instead.
- **Google** reads it to understand your images (**SEO**).

Good `alt` text describes **what's in the picture**, as if you're explaining it on the phone:
- ❌ `alt="image1"` or `alt="henna"`
- ✅ `alt="Floral henna design covering the back of a hand"`

### Step 1: get 3 sample photos

1. Create a folder called `images` in your project (next to `index.html`).
2. Go to **pexels.com** or **unsplash.com** and search "henna".
   Photos there are free to use, which matters: you can't use random images
   from Google because they belong to someone else.
3. Download **3** photos (pick the "small" or "medium" size, so the page loads fast).
4. Move them into your `images` folder and **rename** them simply, e.g.:
   - `henna-1.jpg`
   - `henna-2.jpg`
   - `henna-3.jpg`

   **Naming rules:** all lowercase, no spaces (use `-` instead).
   Spaces in file names cause broken paths.

### Step 2: the HTML (in `index.html`)

Between the Services and Contact sections, add a new `<section>` with:
1. An `<h2>`: **Gallery**
2. A `<p>`: **Sample photos for demonstration. Not the artist's own work.**
   (Honest labelling, like your sample prices.)
3. Three `<img>` elements, each with a `src` pointing to one of your images and
   a descriptive `alt` (look at each photo and describe it).

### Step 3: the CSS (in `style.css`)

Your images are probably **huge** and spill off the page. Fix it with a rule
using the selector `img` (no dot, because it targets every `<img>`, like `h1` and `body`):

| Property | Value | What it does |
|---|---|---|
| `max-width` | `100%` | Never wider than its container (your 700px column) |
| `height` | `auto` | Keep the right proportions, so it isn't squished |
| `border-radius` | `8px` | Rounded corners, matching your cards |

This is your first bit of **responsive design**: the image shrinks to fit any screen.

### Test

1. Save and refresh. You should see 3 photos, none wider than the page column.
2. **Break it on purpose:** change one `src` to a wrong file name. What shows up
   instead of the photo? (That's the `alt` text.) Then fix it back.
3. Make the browser window narrow. The images should shrink with it.
4. Add, commit, push.

**If an image doesn't show:** 99% of the time the `src` path doesn't match the
real file name. Check the spelling, uppercase/lowercase, and the extension
(`.jpg` vs `.jpeg` vs `.png`).

---

## Done: services as cards ✅

## Previous task: style the services as cards

### Why

A **card** is a box with a background, padding and rounded corners that groups
related content. Cards make sections easier to scan. You've seen them on almost
every website.

You already know most of what you need: `background-color`, `padding`,
`border-radius`, `margin`. This task combines them, plus one new property.

### New concept: `border`

`border` draws a line around a box. It takes 3 values in one line:

```css
border: 1px solid #e6d3bf;
```

- `1px` = thickness
- `solid` = style (others: `dashed`, `dotted`)
- `#e6d3bf` = colour (a soft tan)

Setting several things in one property like this is called a **shorthand**.

### New concept: the box model

Every element is a box made of 4 layers, from inside out:

```
margin   (space outside the border, pushes other boxes away)
border   (the line)
padding  (space inside the border, around the content)
content  (the text)
```

### Your task (in `style.css`)

**Rule 1:** selector `.service` (remember the dot!)

| Property | Value | What it does |
|---|---|---|
| `background-color` | `white` | Card stands out from the cream page |
| `border` | `1px solid #e6d3bf` | Soft tan outline |
| `border-radius` | `8px` | Rounded corners |
| `padding` | `16px` | Space inside the card |
| `margin-bottom` | `16px` | Gap below each card, so they don't touch |

**Rule 2:** selector `.price`

| Property | Value | What it does |
|---|---|---|
| `color` | `#8b4513` | Henna brown, same as your button |
| `font-weight` | `bold` | Makes the price stand out |

### Test

1. Save and refresh. Each service should be a white rounded box with a thin outline,
   with a gap between them, and bold brown prices.
2. **Experiment:** change `padding` to `40px` and refresh. What changes?
   Then change it back. Experimenting like this is how you learn CSS.
3. Use DevTools: right-click a card → **Inspect**. In the Styles panel, scroll down
   to see a coloured diagram of the box model (margin, border, padding, content).
4. Add, commit, push.

---

## Done: Services descriptions and sample prices ✅

## Previous task: upgrade Services with descriptions and sample prices

### Why

Right now Services is just three bullet points. Visitors want to know
**what each service is** and **roughly what it costs** before contacting you.
In this task you'll give each service its own small block of content.
(Next task we'll style these blocks as "cards" with CSS.)

### New concept: `<div>`

A `<div>` is a **generic box** with no meaning of its own. Use it when you need
to group things together (usually to style them) and no semantic tag fits.

Compare:
- `<section>` = "this is a themed part of the page" (has meaning)
- `<div>` = "just a box to group these" (no meaning)

### New concept: heading levels in practice

Your page title is `h1`, section titles are `h2`.
Each service *inside* the Services section gets an `h3`.
Never skip levels (don't jump from `h2` to `h4`). Screen readers use the levels
like a table of contents.

### Your task (in `index.html`)

1. **Delete** the whole `<ul>...</ul>` list in Services (keep the `<h2>`).
2. Below the `<h2>`, add **three** `<div>` elements, each with `class="service"`.
3. Inside each `div`, put:
   - an `<h3>` with the service name
   - a `<p>` with a one-sentence description
   - a `<p>` with the price, plus `class="price"`

Use this sample content:

| Service | Description | Price |
|---|---|---|
| Bridal Henna | Detailed hands and feet designs for your wedding day. | From $150 (sample price) |
| Party & Event Henna | Quick designs for guests at birthdays, Eid and other celebrations. | From $80/hour (sample price) |
| Simple Hand Designs | Small, elegant designs for one hand or both. | From $20 (sample price) |

**Hints:**
- Here's the shape of **one** service block. Repeat it 3 times:
  ```
  div (class="service")
  ├── h3
  ├── p
  └── p (class="price")
  ```
- Remember: `&` must be written as `&amp;`
- Write `class="..."` on the **opening** tag, like you did for the button.
- `Shift + Alt + F` when done.

### Test

1. Save and refresh. You should see three service names in a slightly
   smaller heading size than "Services", each with a description and price.
2. Commit and push:
   ```
   git add .
   git commit -m "Add service descriptions and sample prices"
   git push
   ```

---

## Done: project on GitHub ✅

Repo: https://github.com/MoosaZDigital/henna-landing-page

## Previous task: put your project on GitHub

### Why

So far your commits live **only on your computer**. If your laptop dies, they're gone.
**GitHub** is a website that stores a copy of your Git project online.

- **Backup**: your code is safe.
- **Portfolio**: employers and clients can see your work.
- Later, we can use it to put the site **live on the internet** (GitHub Pages).

### New terms

| Term | Meaning |
|---|---|
| **Repository (repo)** | A project tracked by Git. Your folder is a *local* repo. |
| **Remote** | A copy of your repo stored somewhere else (on GitHub). |
| **origin** | The usual nickname for your main remote. |
| **Push** | Upload your commits to the remote. |
| **Branch** | A line of commits. Yours is called `master`; GitHub's default name is `main`. |

### Part 1: create the repo on GitHub (in your browser)

1. Log in at github.com (create a free account if you don't have one).
2. Click the **+** at the top-right, then **New repository**.
3. Repository name: `henna-landing-page`
4. Choose **Public** (so it can be part of your portfolio).
5. **Do NOT tick** "Add a README", ".gitignore" or "license".
   Your repo must start empty, because you already have commits to upload.
6. Click **Create repository**.

GitHub then shows a page with setup commands. **Copy the URL** that ends in `.git`
(it looks like `https://github.com/YOUR-USERNAME/henna-landing-page.git`).

### Part 2: connect and push (in the VS Code terminal)

Run these one at a time:

```
git branch -M main
```
Renames your branch from `master` to `main`, to match GitHub's default.

```
git remote add origin PASTE-YOUR-URL-HERE
```
Tells Git: "my remote copy, nicknamed `origin`, lives at this URL."

```
git push -u origin main
```
Uploads your commits. `-u` remembers this, so next time you only type `git push`.

**The first push may open a browser window asking you to sign in to GitHub.**
That's normal. Sign in and allow access.

### Test

Refresh your repo page on GitHub. You should see `index.html`, `style.css`,
`script.js` and `lesson-notes.md`, and your commit count.

### Your new workflow from now on

```
git add .
git commit -m "message"
git push
```

If you get an error, **copy the full error text** and paste it to Claude.

---

## Done: "Book Now" button ✅

## Previous task: a "Book Now" button

Every business landing page needs one clear **call to action** (a button
telling the visitor what to do next). Ours: **Book Now**.

### Step 0: commit your styling first

You haven't committed the `body` styling yet. Do that before starting:

```
git add .
git commit -m "Add body styling"
```

### New concept: classes

So far your CSS selectors target **every** element of a type (`h1`, `body`).
But we want to style **one specific link** as a button, not all links.

A **class** is a label you put on an element in HTML:

```html
<a href="#contact" class="button">Book Now</a>
```

Then in CSS, you target that label with a **dot**:

```css
.button {
  /* styles here */
}
```

- `class="button"` in HTML = "this element has the label *button*"
- `.button` in CSS = "style everything with the label *button*"
- You choose the class name. Pick names that describe the purpose.

### New concept: jump links

`href="#contact"` means "jump to the element on **this page** with `id="contact"`".
An `id` is like a class, but must be **unique**: only one element per page can have it.

### Your task (HTML part): `index.html`

1. Give your Contact `<section>` the attribute `id="contact"`.
2. Inside `<main>`, right **below the tagline**, add a `<p>` containing a link:
   - visible text: **Book Now**
   - `href="#contact"`
   - `class="button"`

**Test:** save, refresh, click **Book Now**. The page should jump to Contact.
(If the window is tall enough to show everything, you might not see a jump.
Make the window shorter to test.)

### Your task (CSS part): `style.css`

Add a new rule with the selector `.button` and these declarations:

| Property | Value | What it does |
|---|---|---|
| `display` | `inline-block` | Lets the link have padding like a box |
| `background-color` | `#8b4513` | Henna brown |
| `color` | `white` | Text colour |
| `padding` | `12px 24px` | Space *inside*: 12px top/bottom, 24px left/right |
| `border-radius` | `6px` | Rounded corners |
| `text-decoration` | `none` | Removes the underline |

`padding` vs `margin`: **padding** = space inside the box (between text and edge),
**margin** = space outside the box (between it and other things).

### Test

1. Save and refresh. **Book Now** should look like a brown, rounded button.
2. Click it. It should still jump to Contact.
3. Commit with your own message.

---

## Done: first real styling (CSS) ✅

## Previous task: first real styling (CSS)

Your HTML structure is done for now. Time to make it look better.

### Warm-up: tidy your HTML

Lines 22–24 and 25–32 of `index.html` have uneven indentation.
Press `Shift + Alt + F` in `index.html` to fix it.

### New concepts

**1. Styling `body` styles the whole page.**
Many CSS properties are **inherited**: if you set a font on `body`,
everything inside `body` (headings, paragraphs, lists) uses it too.

**2. Five new properties:**

| Property | What it does | Example value |
|---|---|---|
| `font-family` | Which font to use | `Georgia, serif` |
| `background-color` | Colour behind the content | `#fdf6ec` |
| `color` | Text colour | `#3b2a20` |
| `max-width` | The widest an element may get | `700px` |
| `margin` | Space *outside* an element | `0 auto` |

**3. Font lists.** `Georgia, serif` means: "use Georgia; if the computer
doesn't have it, use any serif font." The last one is a safe backup.

**4. Hex colours.** `#fdf6ec` is a colour written as a code (red, green, blue
mixed together). VS Code shows a small colour square next to it.
Hover over the square to get a colour picker.

**5. Centering trick.** `max-width: 700px;` plus `margin: 0 auto;`
means "no wider than 700px, and split the leftover space equally
left and right," which centers it. `auto` lets the browser calculate the margin.

### Your task

In `style.css`, **below** your existing `h1` rule, add a new rule
with the selector `body` and these five declarations:

- font-family: `Georgia, serif`
- background-color: `#fdf6ec` (a warm cream)
- color: `#3b2a20` (a dark brown)
- max-width: `700px`
- margin: `0 auto`

**Hints:**
- Same pattern as your `h1` rule: `selector { property: value; }`
- Each declaration goes on its own line and **ends with `;`**
- Missing `;` is the #1 CSS bug. If one line doesn't work, check the line *above* it.

### Test

1. Save and refresh.
2. You should see: a cream background, a new font, brown text,
   and all the content in a centered column. Try making the browser window
   wider and narrower and watch the column.
3. Commit with your own message.

---

## Done: fix Contact section ✅

Both bugs fixed: the sections are now siblings, and the email `href` matches the visible text.

**Lesson:** the `href` and the visible text are separate. The browser doesn't check
that they match, so you must.

---

## Previous task: Contact section

### New concept: links

The `<a>` (anchor) tag makes clickable links. The `href` attribute says where the link goes:

```html
<a href="mailto:hello@example.com">hello@example.com</a>
```

- `mailto:` opens the visitor's email app.
- `tel:` opens the phone dialer (handy on mobile).
- The text between the tags is what the visitor sees and clicks.

### Your task

Inside `<main>`, **below** the Services section, add a new `<section>` with:

1. An `<h2>`: **Contact**
2. A `<p>`: **Serving Edmonton and surrounding areas.**
3. A `<p>` containing an email link to `hello@example.com`
4. A `<p>` containing a phone link showing `780-XXX-XXXX`
   - For the `href`, use `tel:7800000000` (a placeholder number, since links can't contain X's).

### Test

1. Save and refresh the browser.
2. Click the email link. Your email app should try to open.
3. Commit with your own message:

```
git add .
git commit -m "your message here"
```

Then tell Claude it's done.

---

## Concepts learned so far

| Concept | Meaning |
|---|---|
| Tag | `<p>` opens, `</p>` closes |
| Element | Opening tag + content + closing tag |
| Attribute | Extra info inside an opening tag, e.g. `lang="en"` |
| Nesting | Elements inside other elements; indent to show it |
| `<head>` | Information *about* the page (not shown on it) |
| `<body>` | Everything the visitor sees |
| `<title>` | Text in the browser tab and Google results (SEO) |
| `<link>` | Connects a CSS file to the HTML |
| Relative path | File location starting from the current file, e.g. `style.css` |
| CSS rule | `selector { property: value; }` |
| Semantic HTML | `header`, `main`, `section`, `footer` describe *meaning*; helps accessibility and SEO |
| Headings | `h1` (one per page) → `h2` (sections) → `h3` (items) |
| Lists | `<ul>` holds `<li>` items (bullets) |
| HTML entity | Code for a special character: `&copy;` = ©, `&amp;` = & (always ends with `;`) |
| Link | `<a href="...">text</a>`; `mailto:` = email, `tel:` = phone |
| Git commit | A saved snapshot: `git add .` then `git commit -m "message"` |
| Array of objects | A list of items, each with named parts: `{ question: "...", answer: "..." }` |
| `for...of` loop | Runs the same code once for each item in an array |
| `createElement` | JavaScript makes a new HTML element, e.g. `document.createElement("button")` |
| `append` | Puts created elements onto the page, inside a chosen box |
| Page source vs Elements | Page source = the file you wrote; Elements (Inspect) = what the browser built |
| `git commit --amend` | Fix the last commit message, **only before pushing** |
| Function | Named, reusable code: **define** with `function name() { }`, **call** with `name();` |
| `querySelectorAll` | Finds **all** matching elements (a list you can loop over) |
| `classList.contains` | Checks if an element has a class: `true` or `false` |
| `if` statement | Runs code only when a condition is `true` |
| Undo / redo | `Ctrl + Z` undoes, `Ctrl + Y` brings it back |

## Why build the FAQ from an array?

- To add a question, I only add one object to the array. No HTML changes.
- The loop writes the button and answer code once, not once per question.
- All FAQ content lives in one place, so it's easy to edit.

## Debugging habits

- Change didn't show up? **Check for the unsaved ● dot** on the file tab, then refresh.
- CSS not working? Check that the `href` file name **exactly** matches the real file name.
- `Shift + Alt + F` formats (re-indents) your code.
