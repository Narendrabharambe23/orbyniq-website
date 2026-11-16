# ORBYNIQ - Official Startup Website

Modern, responsive corporate website for **ORBYNIQ** — Delivering reliable, scalable, and intelligent AI and software engineering solutions.

> **Motto:** *"Let's build what's next."*

---

## 🎨 Brand Identity & Palette
- **Logo Style**: Sleek geometric typography with vibrant electric orange **O** and bold black/white lettering.
- **Brand Orange**: `#FF5500` / `#E45A0F`
- **Obsidian Dark Surface**: `#07090E` / `#0E131F` / `#141B2D`
- **Clean Slate / White**: `#FFFFFF` / `#F8FAFC`
- **Typography**: Space Grotesk (Headings) & Plus Jakarta Sans (Body)

---

## 🚀 Key Features Built-In
1. **Interactive Hero Canvas**: Glowing neural particle network responding to mouse movement and ambient physics.
2. **Interactive AI & Automation ROI Calculator**: Prospective clients can adjust sliders (team size, manual hours, hourly rate, automation target) and get an immediate annual cost savings and ROI projection.
3. **Core Services Architecture**:
   - Software Development
   - Artificial Intelligence & Machine Learning
   - IT Consulting & Technology Solutions
   - Web & Application Development
   - Business Process Automation
   - SaaS & Product Development
   - Digital Transformation
4. **Company Vision & Mission Showcase**: Spotlighting Orbyniq's vision, mission, and core values.
5. **Project RFP & Discovery Form**: Interactive lead capture form with instant confirmation modal.
6. **Dark & Light Mode Switcher**: Smooth dual-theme support with persistent `localStorage`.
7. **LinkedIn Direct Connection**: Integrated link to Orbyniq's official LinkedIn profile.

---

## 📂 File Structure
```
orbyniq-website/
├── index.html            # Main landing page with hero, services, calculator, and contact
├── services.html         # Deep-dive breakdown of all 7 service pillars and tech stacks
├── about.html            # Company vision, mission, leadership, and core principles
├── contact.html          # Dedicated project inquiry and consultation booking
├── assets/
│   ├── css/
│   │   └── style.css     # Glassmorphism, animations, gradients, and custom themes
│   ├── js/
│   │   └── main.js       # Particles canvas, ROI calculator, theme toggle, and modals
│   └── images/
│       ├── logo.png             # Crisp cropped transparent logo
│       ├── logo-dark.png        # Dark mode inverted logo variant
│       ├── logo-original.png    # Original source logo
│       └── favicon.png          # 64x64 brand icon
└── README.md             # Documentation and deployment guide
```

---

## ⚡ How to Run Locally

### Option 1: Direct File Opening
Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, or any modern web browser.

### Option 2: Local HTTP Server (Python)
Run the following in the `orbyniq-website` directory:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 Free 1-Click Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside `orbyniq-website/` and follow the prompts.

### Netlify
1. Drag and drop the `orbyniq-website` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).

### GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings > Pages** and select the main branch root.
