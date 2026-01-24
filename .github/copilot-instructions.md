# Copilot Instructions — Portfolio Website

## Project Overview
This is a professional portfolio website for Mamadou Modibo Traoré—a polymath engineer showcasing expertise across web development, backend (Django), systems administration, and 2D/3D creative work. The site is **static HTML/CSS/JS** with no build step or framework, deployed as vanilla assets.

### Architecture
- **`index.html`**: Single-page portfolio (285 lines) with semantic structure: header nav, hero, projects grid, about, skills, contact sections, and modal lightbox
- **`styles.css`**: Custom CSS grid system (136 lines) using CSS variables, dark theme (blue-gray gradient), responsive breakpoints at 1000px and 720px
- **`script.js`**: Vanilla JS for mobile nav toggle, project modal, tech filtering, and demo contact handler
- **`assets/`**: Project images (placeholders included with `[À REMPLACER]` markers) and screenshots

## Development Conventions

### Content Language & Localization
- **Primary language: French** (HTML `lang="fr"`, all copy, labels, placeholders in French)
- Use "À propos" (not "About"), "Projets" (not "Projects"), "Compétences" (Skills), "Contact"
- For **new sections or content additions**: match the French naming pattern and tense (e.g., "Système de gestion" not "Management System")

### HTML Structure & Accessibility
- Use **semantic HTML** (sections, articles, roles, aria-labels)
- Maintain **section IDs** for nav anchors: `#projects`, `#about`, `#skills`, `#contact`
- Project cards use `data-*` attributes for filtering: `data-tech="django"`, `data-title=`, `data-desc=`
- Modal uses `aria-hidden="true|false"` for visibility (not `display: none/flex`)
- Form elements require `required` attribute and `aria-label` on custom buttons

### Styling Approach
- **CSS Variables** (`:root` block) define color palette—always reference vars, never hardcode hex values
  - `--accent` (mint green, primary CTA)
  - `--accent-2` (blue, secondary)
  - `--bg` (dark navy background)
  - `--card` (slightly lighter navy card bg)
  - `--muted` (light gray text)
- **CSS Grid** for layout; flexbox for components (cards, nav, footer)
- **Responsive**: Mobile-first approach implicit in media queries—layout stacks to single column at 720px
- **Glass morphism**: Use `rgba(255,255,255,0.03)` + `backdrop-filter: blur(6px)` for subtle glass effect

### JavaScript Patterns
- **Event-driven**: Attach listeners to elements by ID or class in `DOMContentLoaded`
- **Project modal**: Reads `data-*` attributes from card and populates modal; closed via ESC key or backdrop click
- **Mobile nav**: `.nav` toggle shows/hides, navToggle button text changes from ☰ to ✕
- **Filtering**: Select box with tech values filters `.project` cards by `data-tech` attribute
- **Demo handlers**: Contact form has placeholder handler—replace with actual API (Formspree, Netlify, custom endpoint)

## Adding New Features

### New Project Cards
1. Create `<article class="card project">` inside `.projects-grid`
2. Add `data-tech`, `data-title`, `data-desc` attributes (French titles/descriptions)
3. Include tech tags in `.card-tags` (e.g., "Python • Django • PostgreSQL")
4. Modal will auto-populate from data attributes—no extra JS needed

### New Sections
- Wrap in `<section id="unique-id" class="section">` (or `.section.alt` for alternating bg)
- Add to nav if needed: `<a href="#unique-id">Label</a>`
- Use `.container` for max-width wrapping
- Follow grid patterns: 3-column on desktop, 2 on tablet, 1 on mobile (update media queries if needed)

### Image Placeholders
- Find markers: `[À REMPLACER — ASSET_NAME : assets/path.png]`
- Replace entire `<div class="img-placeholder">` with `<img src="assets/path.png" alt="...">`
- Keep aspect ratio consistent (hero: wide, project cards: portrait-ish)

### Contact Integration
- Replace `handleContact()` function with live endpoint (Formspree, Netlify Forms, custom API)
- Maintain form state: `form.reset()` after success, update `#contactStatus` with feedback
- Keep `aria-live="polite"` on status div for screen reader announcements

## Key Files & Responsibilities
| File | Purpose | When to Edit |
|------|---------|--------------|
| [index.html](index.html) | Markup & structure | Add sections, cards, nav links, contact fields |
| [styles.css](styles.css) | Theming & layout | New colors, grid changes, mobile breakpoints |
| [script.js](script.js) | Interactivity | Modal, filtering, nav toggle, contact handler |
| [assets/](assets/) | Images & media | Portfolio project screenshots, hero image |

## Common Tasks

- **Update project list**: Add card in `#projects` with data attributes; modal handles display
- **Tweak colors**: Edit CSS variables in `:root` (`:root { --accent: #newcolor; }`)
- **Add skill**: Insert `<div class="skill">` in `.skills-grid`—width bar auto-inherits `.meter span` styling
- **Change nav items**: Edit anchor hrefs in `.nav` to match section IDs
- **Test responsive**: Check 1000px and 720px breakpoints; stack layouts change at those thresholds
