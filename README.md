# Robin's Nest Egg — how this site works

A plain-English guide to the site's files and the jobs you'll do most often.
Written for someone with no coding background. Nothing here needs a terminal.

---

## The golden rule

> **Every page is a real, separate file with all of its words written inside it.**

No page should ever fetch its text after it opens. This is the whole reason the
site will be visible to Google when our paywalled competitors aren't. If a future
feature seems to need the "app" approach, that's the moment to stop and ask.

The one exception is the **email signup form** on the homepage, which is a script
from EmailOctopus because that's the only method they offer. That's fine: Google
has no interest in reading a signup box. **The topic pages contain no scripts at
all** — checked and confirmed.

---

## What each file does

```
Robins Nest Egg/
├── index.html                  ← the homepage
├── css/
│   └── style.css               ← controls how EVERY page looks
├── topics/
│   └── saving/
│       └── index.html          ← the Saving topic (and the template to copy)
├── sitemap.xml                 ← the list of pages, for Google
├── robots.txt                  ← tells search engines they're welcome
└── README.md                   ← this file
```

**`css/style.css` is the important one.** All the colours, fonts and spacing live
in it. Change a colour there and it changes on every page at once. The top of the
file is a "settings panel" of named colours — that's where most edits belong.

---

## Job 1: Adding a new topic page (the weekly 20 minutes)

1. **Copy the folder** `topics/saving/` and paste it back into `topics/`.
2. **Rename the copy** to your new topic, all lowercase with hyphens instead of
   spaces — e.g. `topics/growing-it/`. This name becomes the page's web address,
   so keep it short and readable.
3. **Open the `index.html` inside your new folder** and change these seven things
   (each one is marked with a comment in the file):
   - the `<title>`
   - the `<meta name="description">`
   - the `<link rel="canonical">` address
   - the three `og:` social sharing lines
   - the breadcrumb and the `<h1>`
   - the three age band sections
   - the "What's next" box at the bottom
4. **Add it to the menu** — open `index.html` in the main folder, find the
   navigation list, and copy one of the existing `<li>` lines.
5. **Add it to `sitemap.xml`** — copy one of the existing `<url>` blocks, change
   the address and today's date.
6. **Preview it** (see Job 2), read it once, then publish.

Or simply open Claude Code in this folder and say:

> *"Create a new topic page for [topic] from the Saving template, using these
> three age versions. Add it to the menu and the sitemap."*

---

## Job 2: Previewing a page before publishing

Double-click any `.html` file and it opens in your browser. That's it — no server,
no build step, nothing to install.

The only thing that won't work when previewing this way is the email signup form,
because EmailOctopus needs a real web address to talk to. It'll work once live.

---

## Job 3: Adding the Cloudflare Analytics snippet

Once the site is live and registered with Cloudflare, they'll give you a one-line
snippet. In **each** `.html` file, search for `CLOUDFLARE WEB ANALYTICS` — there's
a clearly marked comment showing exactly where to paste it.

It has to go on every page, because each page counts its own visits.

---

## Job 4: Publishing a change

The site lives on GitHub and is hosted by Vercel. When you push a change to
GitHub, Vercel puts it live automatically about thirty seconds later. You've done
this on two previous projects — it's the same routine.

---

## Things worth knowing

**Why paths look like `../../css/style.css`.** On a topic page, `../../` means
"go up two folders to the main site folder". Every topic page sits exactly two
folders deep, so this line is identical on all of them — don't change it when you
copy the template.

**Why the age bands are three sections rather than tabs.** All three versions are
visible on the page, with jump-links at the top. It needs no JavaScript, every
word is readable by Google, it still works if something breaks, it prints
properly, and a parent can compare the age bands to see what's coming next.

**Why "Growing It" isn't a link yet.** It's plain grey text because that page
doesn't exist. A link that leads nowhere is worse than no link. Turn it into a
real link once the page is built — it appears twice on the Saving page, plus once
in the "What's next" box.

**The header is repeated on each page.** With two pages that's fine. Once there
are more, there are tidier ways to handle it — worth revisiting around topic four.

**Never hard-code today's interest rates or prices** into a topic. Use
"imagine the bank pays 5%..." style examples so pages don't go stale.

---

## If something breaks

Every change is saved in the site's history on GitHub, so anything can be undone.
If a page looks wrong, the fastest fix is usually to compare it against
`topics/saving/index.html`, which is known to be correct.
