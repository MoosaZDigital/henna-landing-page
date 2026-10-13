# Lesson Notes

## Current task: a contact form

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

## Debugging habits

- Change didn't show up? **Check for the unsaved ● dot** on the file tab, then refresh.
- CSS not working? Check that the `href` file name **exactly** matches the real file name.
- `Shift + Alt + F` formats (re-indents) your code.
