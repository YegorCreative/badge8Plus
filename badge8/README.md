# Badge 8 — Premium Cinematic Film Studio

Badge 8 is a premium cinematic film studio purpose-built for enterprise software companies. The site design feels calm, confident, restrained, and highly authoritative. 

It is implemented as an ultra-lightweight, high-performance static website using HTML5, modular CSS, and modern clientside JavaScript. It relies entirely on native browser features with absolutely zero external frameworks or bulky dependencies.

---

## 🎨 Visual Identity & Style System
* **Atmosphere**: Deep cinematic dark mode using elegant charcoal and rich dark slate tones.
* **Warm Understated Accent**: A quiet bronze/champagne gold accent (`hsl(36, 32%, 64%)`) applied with careful restraint to highlight key navigational nodes and brand metrics.
* **Typography**: Clean, geometric `Inter` applied across headings, body paragraphs, and UI navigation labels to preserve high legibility and an authoritative, enterprise-ready aesthetic.
* **Apple-Level Restraint**: No cartoon graphics, no playful emojis, and no loud gradients. Clean, structured cards with razor-thin borders, subtle radial shadows, and balanced negative space.

---

## 📂 Project Architecture

```text
badge8/
├── index.html          # Core single-page template with semantic landmarks
├── README.md           # Documentation and asset management guidelines
├── css/
│   ├── variables.css   # Color palette tokens, fluid spacing, typographies, and layers
│   ├── base.css        # Box-sizing resets, typographic resets, scroll configurations
│   ├── layout.css      # Core grid structures, blurred header overlay, structural footers
│   ├── components.css  # Refined outline buttons, glassmorphic cards, pill badges
│   ├── sections.css    # Individual styling rules for the 10 homepage sections
│   ├── animations.css  # Entrance keyframes, scroll timelines, prefers-reduced-motion overrides
│   └── responsive.css  # Mobile-first breakpoint systems (Tablet, Desktop, Wide screens)
├── js/
│   └── script.js       # Mobile menu transitions, active navigation trackers, reveal animations
└── assets/
    ├── images/         # High-resolution photographic mockups
    ├── videos/         # Direct cinematic clips and hero video textures
    ├── icons/          # Clean SVG vector symbols
    └── logos/          # Authorized branding marks
```

---

## 📹 Asset & Media Protocol

To maintain premium performance, protect Largest Contentful Paint (LCP) speeds, and preserve the cinematic visual brand, all visual assets must adhere to the following technical and creative standards:

### 1. Image Optimization & Formats
* **Modern Formats**: Always prioritize modern next-gen image formats like **AVIF** and **WebP** for photographic content and diagrams. Reserve PNG/SVG strictly for logos and iconography.
* **Lossless SVG Optimization**: Run all vector SVGs through an optimization pass (e.g., SVGO) to strip metadata, editor comments, and unnecessary nodes before deployment.
* **Responsive Sizing**: Provide source files cropped to exact layout constraints. Avoid loading over-dimensioned imagery for small components.

### 2. Video Performance & Compression
* **Target Codecs**: Use high-efficiency container formats—specifically **WebM (VP9/AV1)** and highly compressed **MP4 (H.264)**—for web playback.
* **Background Loops**: Restrict background video loops to short durations (under 10 seconds), muted by default, and compressed with low bitrates (targeting <1MB).
* **Autoplay Restraint**: Avoid heavy visual autoplay unless critical to the user experience. All looping video tags must include `muted playsinline autoplay loop` and use the CSS `content-visibility: auto` property on offscreen loops to protect mobile CPU cycles.

### 3. Core Web Vitals & LCP Protection
* **Explicit Dimensions**: Always define `width` and `height` attributes on HTML image and video elements to prevent Layout Shifts (CLS).
* **Priority Loading**: Apply `fetchpriority="high"` and `loading="eager"` exclusively to critical hero visual assets (LCP candidates), while using native lazy-loading (`loading="lazy"`) for all offscreen content.

### 4. Brand-Aligned Creative Direction
* **Cinematic Dark Tones**: Maintain low-exposure, high-contrast imagery with dark slate and cool gray bases. Visuals should emphasize structural systems and cinematic lighting.
* **Restrained Composition**: Avoid cluttered layouts, generic tech stock photography, cartoon illustrations, or bright, saturated gradients. Every asset must feel calm, intentional, and enterprise-grade.

---

## ⚙️ Core Technical Features

### 1. Pure CSS Scroll-Driven Animations
The navigation header uses a native CSS scroll-driven timeline (`animation-timeline: scroll()`) to scale down dynamically, transition to a glassmorphic background, and project a blurred border as the user scrolls.

### 2. High-Performance Intersection Observers
* **Active Section Tracking**: High-performance observation coordinates current viewport positions to highlight active states inside navigation links in real-time.
* **Subtle Scroll Reveals**: Renders smooth cinematic fade-ins (`translateY` + `blur`) when elements with `.reveal` enter viewport limits.

### 3. Motion Preference Compliance
All CSS transitions, keyframes, scroll timelines, and Javascript trackers listen to system motion settings. If `prefers-reduced-motion: reduce` is detected, animations degrade gracefully to static states to accommodate high accessibility standards.

---

## 🛠️ Developer Workflow

### Adding New Sections
1. Write the markup inside `index.html` using a semantic `<section>` element. Provide an `id` that matches the navigation links.
2. Structure layout specifics under a new block comment in `css/sections.css`.
3. Add `.reveal` classes to trigger smooth scroll-reveals automatically.

### Updating Design Tokens
All core values reside inside `css/variables.css`. Modify variables directly to adjust colors, corner radiuses, and padding constants globally:
```css
:root {
  --bg-primary: #080808;      /* Change primary background */
  --accent-gold: hsl(36, 32%, 64%); /* Change secondary highlight accent */
}
```

### Running Locally
To launch locally with high-performance hot-reloading:
```bash
# Recommended static server utility
npx browser-sync start --server --files "index.html, css/*.css, js/*.js"
```
Or open `index.html` directly in any modern browser.
