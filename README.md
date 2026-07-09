# Archie My Kuya Website

A science-themed static website for Archie, a biology teacher interested in AI and welding. The site is designed to be eye-catching, easy to update, and ready for future interactive features.

## What is included

- `index.html` — the main website layout
- `styles.css` — the full visual science theme
- `script.js` — interactive behavior, animation, lab tabs, and demo question board
- `assets/content.js` — simple editable lesson cards, lab text, updates, and starter questions
- `docs/image-prompts.md` — prompts for generating placeholder and hero images
- `llms.txt` — AI/search-friendly site summary

## How Archie can update the website

Most basic content can be changed inside:

```text
assets/content.js
```

Edit the lesson card titles, descriptions, update posts, and lab explanations there. This keeps the design separate from the content.

## Current interaction features

The question board works in demo mode using browser local storage. That means questions appear on the visitor's own browser only. Later, this can be upgraded to use:

- Netlify Forms
- Formspree
- Firebase
- Supabase
- Cloudflare Workers + D1
- A custom backend

## Image placeholders

The first version uses visual CSS and emoji/science placeholders so the site works immediately. Use the prompts in `docs/image-prompts.md` to generate real science-themed images later.

## Deployment options

This is a static website and can be deployed on:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel

For Cloudflare Pages, connect this repository and set the build output directory to the project root. No build command is needed.
