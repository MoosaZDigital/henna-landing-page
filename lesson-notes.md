# Lesson Notes

## Current task: style the services as cards

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

## Debugging habits

- Change didn't show up? **Check for the unsaved ● dot** on the file tab, then refresh.
- CSS not working? Check that the `href` file name **exactly** matches the real file name.
- `Shift + Alt + F` formats (re-indents) your code.
