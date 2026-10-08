# Lesson Notes

## Current task: Contact section

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
| Git commit | A saved snapshot: `git add .` then `git commit -m "message"` |

## Debugging habits

- Change didn't show up? **Check for the unsaved ● dot** on the file tab, then refresh.
- CSS not working? Check that the `href` file name **exactly** matches the real file name.
- `Shift + Alt + F` formats (re-indents) your code.
