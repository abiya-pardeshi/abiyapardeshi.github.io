# Abiya Pardeshi — Portfolio

A personal data analyst portfolio website. Dark editorial design with animated data-viz accents, built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## 📁 File Structure

```
portfolio/
├── index.html      # Main HTML (all sections)
├── style.css       # All styles (dark theme, responsive)
├── script.js       # Interactivity (cursor, canvas, animations)
├── resume.pdf      # ← Add your resume here (for CV download)
└── README.md       # This file
```

---

## 🚀 Getting Started

### Local Preview
Just open `index.html` in any browser — no build step needed.

```bash
# Or use a local server (recommended to avoid font CORS issues)
npx serve .
# or
python3 -m http.server 8080
```

### Deployment Options

| Platform | Steps |
|----------|-------|
| **GitHub Pages** | Push to a repo → Settings → Pages → Deploy from `main` branch |
| **Netlify** | Drag & drop the `portfolio/` folder at [netlify.com/drop](https://netlify.com/drop) |
| **Vercel** | `npx vercel` inside the folder |
| **Hostinger / cPanel** | Upload all files via File Manager |

---

## ✏️ How to Customize

### Update Contact Info
In `index.html`, search and replace:
- `abiyapardeshi05@gmail.com` → your email
- `+91 8805780825` → your phone
- `https://linkedin.com/in/abiya-pardeshi` → your LinkedIn URL

### Add CV Download
1. Place your resume PDF as `resume.pdf` in the same folder
2. In `index.html`, find the Download CV link and change:
   ```html
   <a href="#" class="link-pill download-cv">↓ Download CV</a>
   ```
   to:
   ```html
   <a href="resume.pdf" download class="link-pill">↓ Download CV</a>
   ```
3. In `script.js`, remove the `downloadBtn` event listener block (lines ~last 10)

### Add a Profile Photo
In `index.html`, inside `.about-card-inner`, replace the `.about-initials` div:
```html
<!-- Remove this: -->
<div class="about-initials">AP</div>

<!-- Add this: -->
<img src="photo.jpg" alt="Abiya Pardeshi"
  style="width:72px;height:72px;border-radius:50%;object-fit:cover;" />
```

### Change Accent Color
In `style.css`, update the CSS variables at the top:
```css
--accent:  #f0a84c;   /* main gold — change this */
--accent2: #e55d3a;   /* orange — change this */
--accent3: #4cc9f0;   /* blue — change this */
```

### Add New Projects / Work Cards
In `index.html`, duplicate a `.work-card` block and update:
- `.work-card-num` → next number
- `.work-impact` → your key metric
- `h3` → project title
- `p` → description
- `.work-tags span` → tech tags used

### Add Certifications
Duplicate a `.cert-item` block and add a new color class for the logo in `style.css`:
```css
.cert-logo.new { background: #yourcolor; }
```

---

## 🎨 Design System

| Token | Value | Used for |
|-------|-------|----------|
| `--bg` | `#0a0a0b` | Page background |
| `--bg-card` | `#111114` | Card backgrounds |
| `--accent` | `#f0a84c` | Gold — primary accent |
| `--accent2` | `#e55d3a` | Orange — secondary |
| `--accent3` | `#4cc9f0` | Blue — data highlights |
| `--font-display` | DM Serif Display | Headings, hero name |
| `--font-mono` | Space Mono | Labels, tags, code |
| `--font-body` | Syne | Body text |

---

## 📱 Browser & Device Support

- ✅ Chrome, Firefox, Safari, Edge (latest)
- ✅ Mobile responsive (768px breakpoint)
- ✅ Custom cursor auto-disabled on touch devices
- ✅ Scroll-triggered animations via IntersectionObserver
- ✅ Canvas animation degrades gracefully if unsupported

---

## 🔧 Features

- **Custom cursor** with trail and hover effect
- **Animated hero canvas** — live data-viz decoration (bars, line chart, scatter)
- **Counter animation** on stats when hero enters viewport
- **Scroll-reveal** on all major sections
- **Skill bar animation** on intersection
- **Active nav link** highlighting on scroll
- **Mobile hamburger menu**
- **Radial gradient hover** on skill cards
- **Sticky nav** with blur on scroll

---

## 📄 License

Personal use only. Designed for Abiya Pardeshi's portfolio.
