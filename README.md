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

### The normal way

1. **Write the three age versions** in your ideas doc during the week:
   Hatchlings (5–6), Fledglings (7–8), High Flyers (9–10). Plus a one-line
   summary for under the page title.
2. **Open Claude Code in this folder** and say:

   > *"Create a new topic page for [topic] from the Saving template, using these
   > three age versions. Add it to the menu and the sitemap."*

3. **Read the page once** when it's built, then let it publish.
4. **Tell Google the page exists** — see Job 5 below. Takes 30 seconds.

That's it. Steps 1 and 3 are the only ones that need your brain.

### Two rules for writing the copy

- **Never hard-code today's interest rates or prices.** Write "imagine the bank
  pays 5%..." so pages don't go stale. Plan an annual content review each summer.
- **Cite everything or claim nothing.** If a sentence asserts that research shows
  something, it needs a source or a rewrite. As the free independent option,
  credibility is the product.

### The manual way (if you ever need it)

Everything above is just these steps done for you. Useful to know they exist.

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
6. **Keep the analytics line** in the new page's `<head>` (see Job 3), or that
   page won't be counted.
7. **Preview it** (see Job 2), read it once, then publish.

---

## Job 2: Previewing a page before publishing

Double-click any `.html` file and it opens in your browser. That's it — no server,
no build step, nothing to install.

The only thing that won't work when previewing this way is the email signup form,
because EmailOctopus needs a real web address to talk to. It'll work once live.

---

## Job 3: Checking your visitor numbers

Visitor counting is already set up, using **Vercel Web Analytics**. To see the
numbers: Vercel → your project → **Analytics** tab. You get total page views and
unique visitors, broken down per page.

Nothing to maintain. One line does it, and it's already in both pages:

```
<script defer src="/_vercel/insights/script.js"></script>
```

**Keep that line when you copy the template** for a new topic, or that page won't
be counted.

No cookies are used, so no cookie banner is needed. The address starts with `/`,
meaning the file comes from your own domain — no outside company is contacted
when someone reads a page.

> Originally the plan was Cloudflare Web Analytics. Switched on 3 August 2026:
> same free, cookie-free numbers, but served from our own domain instead of a
> third party, and no account token to wrangle. One thing to know for the future:
> this is tied to Vercel, so if you ever move hosting, analytics moves too.

---

## Job 4: Publishing a change

The site lives on GitHub and is hosted by Vercel. When you push a change to
GitHub, Vercel puts it live automatically about thirty seconds later. You've done
this on two previous projects — it's the same routine.

---

## Job 5: Telling Google about a new page

Do this each time a new page goes live. It takes 30 seconds and often turns
"indexed in a few weeks" into "indexed in a few days".

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Use the **search bar across the top** — that's the URL Inspection tool
3. Paste the new page's full address, e.g.
   `https://robinsnestegg.co.uk/topics/growing-it/`
4. Press Enter, wait for it to check, then click **Request Indexing**

**You can stop doing this after a couple of months.** Once Google is visiting the
site regularly it picks new pages up from the sitemap on its own. It only really
helps while the domain is new and Google has no crawling habit for it.

### The sitemap only needs submitting once

It was submitted on 3 August 2026 and Google rechecks it automatically. You do
**not** need to resubmit it when you add pages — the file updates and Google
notices.

> ⚠️ **If you ever do resubmit it:** in the "Add a new sitemap" box, your domain
> is *already filled in*. Type only `sitemap.xml` after it. Pasting the full
> `https://robinsnestegg.co.uk/sitemap.xml` submits the wrong address, and Google
> reports the confusing error *"Sitemap is HTML"* — which means it fetched your
> homepage instead of the sitemap. This caught us out once already.

### What to expect, honestly

An unpromoted new domain sees very little search traffic for the first few months.
Empty reports are normal, not a fault. **Check Search Console once a fortnight at
most** — daily checking is just discouraging.

The pages that eventually pull strangers in are the ones answering questions
parents actually type, like *"how to explain interest to a 6-year-old"*. That's
what the Money Words glossary is for, and it's the most valuable search asset in
the whole plan.

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
