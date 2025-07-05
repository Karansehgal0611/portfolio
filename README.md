# Tennis Portfolio Website

A vibrant, tennis-inspired portfolio for a Computer Science undergraduate, blending modern design, dynamic animations, and professional UX. This README provides comprehensive documentation for setup, customization, deployment, and feature highlights.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Contact Form (EmailJS)](#contact-form-emailjs)
- [Accessibility \& Performance](#accessibility--performance)
- [Credits](#credits)


## Overview

This portfolio transforms a CS student's journey into an engaging, tennis-themed digital experience. It features a clean, modern interface with animated 3D tennis court visuals, match card project displays, stat sheet skills, and a fully functional, tennis-styled contact form.

## Key Features

### 🎾 Theming \& Visuals

- **3D Tennis Court Animation:** Animated homepage with line drawing, depth perspective, and subtle court textures for a premium sports club feel.
- **Tennis Ball Physics:** Realistic, interactive tennis ball bounces and floating particles.
- **Sporty Color Palette:** Accessible, high-contrast greens, whites, and court browns for visibility and style.


### 🏆 Sections

| Section | Description |
| :-- | :-- |
| Home | Tennis-themed welcome, animated court, and dynamic hero message. |
| About Me | Personal growth and skills described using tennis metaphors. |
| Projects | Each project styled as a match card/tournament entry (e.g., "AceBot", "MatchStats Analyzer"). |
| Skills | Displayed as a tennis stat sheet/player profile (languages, frameworks, tools, etc.). |
| Contact | Scoreboard-style form with EmailJS integration and tennis-themed toast notifications. |

### ✨ Animations \& Interactions

- **Loading Animation:** Tennis court setup sequence with ball bounce.
- **Hover Effects:** Racket swings, ball serves, and stat card flips.
- **Scroll Animations:** Parallax backgrounds, sequential reveals, and court dust effects.
- **Responsive Design:** Mobile-first layout, touch-optimized tennis elements.


### 📨 Functional Contact Form

- **EmailJS Integration:** Sends real emails directly from the site—no backend required.
- **Tennis-Themed Toasts:** Instant feedback for success, error, and loading states.
- **Progressive Enhancement:** Works with or without JavaScript.


### ♿ Accessibility \& Performance

- **WCAG AA Compliant Colors:** All text and UI elements meet 4.5:1 contrast ratio.
- **Keyboard Navigation:** Full support with visible focus indicators.
- **Screen Reader Friendly:** Semantic HTML and ARIA labels.
- **Optimized Animations:** CSS hardware acceleration for smooth 60fps performance.


## Live Demo
https://karansehgal0611.github.io/portfolio/

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- [Git](https://git-scm.com/) (for local development)
- [Node.js](https://nodejs.org/) (optional, for advanced customization)


### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/tennis-portfolio.git
cd tennis-portfolio
```

2. **(Optional) Install dependencies:**
If using a build tool or package manager (e.g., npm for advanced JS/CSS):

```bash
npm install
```

3. **Open `index.html` in your browser** to view locally.

## Project Structure

```
tennis-portfolio/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── animations/
├── README.md
```

- **index.html:** Main entry point.
- **css/styles.css:** All custom styles, including 3D court and animations.
- **js/main.js:** Handles animations, EmailJS, and toast notifications.
- **assets/:** Images, icons, and animation files.


## Customization

### Content

- **About Me:** Edit tennis metaphors and personal info in the About section.
- **Projects:** Update project cards in HTML/CSS/JS with your own tennis-themed project names and descriptions.
- **Skills:** Modify the stat sheet to reflect your technical stack.


### Theming

- **Colors:** Adjust CSS variables for primary/secondary colors.
- **Animations:** Tweak keyframes in `styles.css` or add new effects in `main.js`.


## Deployment (GitHub Pages)

1. **Push your code to GitHub:**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages:**
    - Go to your repository’s **Settings**.
    - Scroll to **Pages**.
    - Set source to `main` branch and `/root`.
    - Save and wait for your site to be published.
3. **Access your site:**
`https://your-username.github.io/tennis-portfolio/`

## Contact Form (EmailJS)

### Setup

1. **Create an EmailJS account:**
[EmailJS](https://www.emailjs.com/)
2. **Add your email service** (e.g., Gmail, Outlook).
3. **Create an email template** with variables: `name`, `email`, `message`.
4. **Get your Service ID, Template ID, and Public Key** from the EmailJS dashboard.

### Integration

- In your HTML, include the EmailJS script:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

- Initialize EmailJS in your JS:

```js
emailjs.init({ publicKey: "YOUR_PUBLIC_KEY" });
```

- Handle form submission:

```js
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  // Show loading toast
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(() => {
      // Show success toast
    }, (error) => {
      // Show error toast
    });
});
```

- Replace placeholders with your actual EmailJS values.


### Toast Notifications

- Success: "🎾 Ace! Message served successfully!"
- Error: "🎾 Fault! Message failed to send. Please try again."
- Loading: "🎾 Serving your message..."

Notifications appear in the bottom-right and auto-dismiss after 5 seconds.

For more, see the [EmailJS contact form guide][^1].

## Accessibility \& Performance

- **Contrast:** All colors meet accessibility standards.
- **Navigation:** Tab and keyboard accessible.
- **Screen Readers:** Proper ARIA labels and semantic tags.
- **Performance:** CSS-only animations, minimal JS, optimized for mobile and desktop.


## Credits

- Inspired by modern animated portfolio templates[^2][^3].
- Contact form powered by [EmailJS][^1].
- 3D animation and tennis theming custom-built for this project.


