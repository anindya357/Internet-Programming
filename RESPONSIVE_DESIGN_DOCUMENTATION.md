# FitTrack CUET - Responsive Design Documentation

This document provides a comprehensive overview of the responsive design implementation in the FitTrack CUET application. The project follows a **mobile-first approach** with industry-standard breakpoints.

---

## Table of Contents

1. [Breakpoint Strategy](#breakpoint-strategy)
2. [CSS Custom Properties](#css-custom-properties)
3. [Navigation Responsiveness](#navigation-responsiveness)
4. [Grid Systems](#grid-systems)
5. [Component-Specific Responsiveness](#component-specific-responsiveness)
6. [Accessibility Features](#accessibility-features)
7. [Utility Classes](#utility-classes)
8. [Print Styles](#print-styles)

---

## Breakpoint Strategy

The project uses **4 device breakpoints** following a mobile-first approach:

| Device | Breakpoint | Description |
|--------|------------|-------------|
| Mobile | < 576px | Base styles (no media query needed) |
| Tablet | ≥ 576px | `@media screen and (min-width: 576px)` |
| Laptop | ≥ 992px | `@media screen and (min-width: 992px)` |
| Desktop | ≥ 1200px | `@media screen and (min-width: 1200px)` |

### How Mobile-First Works

Base styles are written for mobile devices first, then progressively enhanced for larger screens using `min-width` media queries:

```css
/* Base styles apply to mobile (< 576px) */
.element {
    font-size: 1rem;
    padding: 1rem;
}

/* Tablet and up */
@media screen and (min-width: 576px) {
    .element {
        font-size: 1.1rem;
        padding: 1.25rem;
    }
}

/* Laptop and up */
@media screen and (min-width: 992px) {
    .element {
        font-size: 1.2rem;
        padding: 1.5rem;
    }
}

/* Desktop */
@media screen and (min-width: 1200px) {
    .element {
        font-size: 1.3rem;
        padding: 2rem;
    }
}
```

---

## CSS Custom Properties

Dynamic spacing and sizing values are controlled through CSS custom properties that change at different breakpoints:

```css
/* Base (Mobile) */
:root {
    --container-max-width: 1280px;
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
}

/* Tablet (≥ 576px) */
@media screen and (min-width: 576px) {
    :root {
        --spacing-md: 1.25rem;
        --spacing-lg: 1.75rem;
    }
}

/* Laptop (≥ 992px) */
@media screen and (min-width: 992px) {
    :root {
        --spacing-lg: 5rem;
        --spacing-xl: 2.5rem;
    }
}

/* Desktop (≥ 1200px) */
@media screen and (min-width: 1200px) {
    :root {
        --container-max-width: 1400px;
        --spacing-xl: 3rem;
        --spacing-2xl: 4rem;
    }
}
```

---

## Navigation Responsiveness

### Mobile Navigation (< 992px)

On mobile and tablet devices, the navigation uses a **hamburger menu** that slides in from the left:

```css
/* Mobile Menu - Hidden by default, slides in when active */
header .nav-menu {
    position: fixed;
    top: 60px;
    left: -100%;              /* Hidden off-screen */
    width: 100%;
    height: calc(100vh - 60px);
    background: rgba(79, 70, 229, 0.98);
    flex-direction: column;
    padding: var(--spacing-xl);
    gap: var(--spacing-sm);
    transition: left 0.3s ease;
    overflow-y: auto;
}

/* When menu is toggled open */
header .nav-menu.active {
    left: 0;                  /* Slides into view */
}

/* Hamburger button visible on mobile */
header .nav-toggle {
    display: flex;
}

/* Hide username on mobile to save space */
header .user-name {
    display: none;
}
```

### Desktop Navigation (≥ 992px)

On laptop and desktop, the navigation displays as a horizontal bar:

```css
@media screen and (min-width: 992px) {
    /* Hide hamburger button */
    header .nav-toggle {
        display: none;
    }

    /* Horizontal menu layout */
    header .nav-menu {
        position: static;
        width: auto;
        height: auto;
        background: transparent;
        flex-direction: row;
        padding: 0;
        gap: var(--spacing-xs);
    }

    /* Show username on desktop */
    header .user-name {
        display: inline;
    }
}
```

### Navigation Brand Scaling

```css
/* Mobile */
header .nav-brand {
    font-size: 1.1rem;
}
header .nav-brand i {
    font-size: 1.3rem;
}

/* Desktop (≥ 1200px) */
@media screen and (min-width: 1200px) {
    header .nav-brand {
        font-size: 1.3rem;
    }
    header .nav-brand i {
        font-size: 1.6rem;
    }
}
```

---

## Grid Systems

### Responsive Container

The container centers content and adjusts max-width based on screen size:

```css
.container {
    width: 100%;
    max-width: var(--container-max-width);  /* 1280px mobile, 1400px desktop */
    margin-inline: auto;
    padding-inline: var(--spacing-md);
}
```

### Stats Grid - Column Adaptation

The stats grid changes column count based on available space:

| Device | Columns | Code |
|--------|---------|------|
| Mobile | 2 | `grid-template-columns: repeat(2, 1fr)` |
| Laptop | 4 | `grid-template-columns: repeat(4, 1fr)` |

```css
/* Mobile - 2 columns */
section.stats-section .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
}

/* Laptop and up - 4 columns */
@media screen and (min-width: 992px) {
    section.stats-section .stats-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

### Equipment Grid - Progressive Columns

| Device | Columns |
|--------|---------|
| Mobile | 1 |
| Tablet | 2 |
| Laptop | 3 |
| Desktop | 4 |

```css
/* Mobile - Single column */
section.equipment-section .equipment-grid {
    grid-template-columns: 1fr;
}

/* Tablet */
@media screen and (min-width: 576px) {
    section.equipment-section .equipment-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Laptop */
@media screen and (min-width: 992px) {
    section.equipment-section .equipment-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Desktop */
@media screen and (min-width: 1200px) {
    section.equipment-section .equipment-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

## Component-Specific Responsiveness

### Welcome Section

Transforms from stacked (mobile) to side-by-side (desktop) layout:

```css
/* Mobile - Stacked, centered */
section.welcome-section {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
}

section.welcome-section h1 {
    font-size: 1.5rem;
}

section.welcome-section .quick-actions {
    flex-direction: column;
    width: 100%;
}

section.welcome-section .quick-actions .btn {
    width: 100%;              /* Full-width buttons on mobile */
    justify-content: center;
}

/* Tablet - Horizontal buttons */
@media screen and (min-width: 576px) {
    section.welcome-section h1 {
        font-size: 1.75rem;
    }
    
    section.welcome-section .quick-actions {
        flex-direction: row;
        justify-content: center;
    }
    
    section.welcome-section .quick-actions .btn {
        width: auto;          /* Auto-width buttons */
    }
}

/* Laptop - Side by side layout */
@media screen and (min-width: 992px) {
    section.welcome-section {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
    }
    
    section.welcome-section h1 {
        font-size: 2rem;
    }
}
```

### Stat Cards - Icon & Font Scaling

```css
/* Mobile */
section.stats-section .stat-icon {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
}
section.stats-section .stat-content h3 {
    font-size: 1.5rem;
}

/* Tablet */
@media screen and (min-width: 576px) {
    section.stats-section .stat-icon {
        width: 55px;
        height: 55px;
        font-size: 1.4rem;
    }
    section.stats-section .stat-content h3 {
        font-size: 1.75rem;
    }
}

/* Laptop */
@media screen and (min-width: 992px) {
    section.stats-section .stat-icon {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
    }
    section.stats-section .stat-content h3 {
        font-size: 2rem;
    }
}

/* Desktop */
@media screen and (min-width: 1200px) {
    section.stats-section .stat-icon {
        width: 70px;
        height: 70px;
        font-size: 1.75rem;
    }
    section.stats-section .stat-content h3 {
        font-size: 2.25rem;
    }
}
```

### Gym Status Section

Changes from vertical stack to horizontal layout:

```css
/* Mobile - Stacked vertically, centered */
section.gym-status-section .status-details {
    flex-direction: column;
    gap: var(--spacing-md);
}

section.gym-status-section .status-item {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-xs);
}

/* Tablet - Horizontal, wrapping */
@media screen and (min-width: 576px) {
    section.gym-status-section .status-details {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    section.gym-status-section .status-item {
        flex: 1 1 200px;
        flex-direction: row;
        text-align: left;
    }
}
```

### Activity Items

```css
/* Mobile - Stacked with centered content */
section.activity-section .activity-item {
    flex-direction: column;
    text-align: center;
    padding: var(--spacing-md);
}

section.activity-section .activity-icon {
    margin: 0 auto var(--spacing-sm);
}

/* Tablet - Horizontal layout */
@media screen and (min-width: 576px) {
    section.activity-section .activity-item {
        flex-direction: row;
        text-align: left;
    }

    section.activity-section .activity-icon {
        margin: 0;
    }
}
```

### Motivational Banner

Font size and padding scale up:

```css
/* Mobile */
.motivational-banner {
    padding: var(--spacing-md);
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: var(--spacing-lg);
}

/* Tablet */
@media screen and (min-width: 576px) {
    .motivational-banner {
        font-size: 1rem;
        padding: var(--spacing-lg);
    }
}

/* Laptop */
@media screen and (min-width: 992px) {
    .motivational-banner {
        font-size: 1.1rem;
    }
}

/* Desktop */
@media screen and (min-width: 1200px) {
    .motivational-banner {
        font-size: 1.2rem;
        padding: var(--spacing-xl);
    }
}
```

### Section Titles

Progressive font sizing:

```css
/* Mobile */
.section-title {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-md);
}

/* Tablet */
@media screen and (min-width: 576px) {
    .section-title {
        font-size: 1.5rem;
    }
}

/* Laptop */
@media screen and (min-width: 992px) {
    .section-title {
        font-size: 1.75rem;
    }
}

/* Desktop */
@media screen and (min-width: 1200px) {
    .section-title {
        font-size: 2rem;
        margin-bottom: var(--spacing-lg);
    }
}
```

### Footer

Transforms from stacked to horizontal:

```css
/* Mobile */
footer.site-footer {
    padding: var(--spacing-lg) 0;
    text-align: center;
}

footer .footer-container {
    flex-direction: column;
    gap: var(--spacing-md);
}

footer .footer-links {
    flex-direction: column;
    gap: var(--spacing-sm);
}

/* Tablet and up */
@media screen and (min-width: 576px) {
    footer .footer-container {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    footer .footer-links {
        flex-direction: row;
        gap: var(--spacing-lg);
    }
}
```

---

## Accessibility Features

### Focus States

Visible focus indicators for keyboard navigation:

```css
a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}
```

### Reduced Motion

Respects user preference for reduced animations:

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### High Contrast Mode

Enhanced contrast for users who need it:

```css
@media (prefers-contrast: high) {
    :root {
        --primary-color: #0000ff;
        --text-dark: #000000;
        --bg-white: #ffffff;
        --border-color: #000000;
    }
}
```

### Screen Reader Only Content

Visually hidden but accessible to screen readers:

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

---

## Utility Classes

### Display Utilities

```css
/* Always apply */
.d-none { display: none !important; }
.d-block { display: block !important; }
.d-flex { display: flex !important; }
.d-grid { display: grid !important; }

/* Mobile Only (< 576px) */
@media (max-width: 575.98px) {
    .d-mobile-none { display: none !important; }
    .d-mobile-block { display: block !important; }
}

/* Tablet Only (576px - 991px) */
@media (min-width: 576px) and (max-width: 991.98px) {
    .d-tablet-none { display: none !important; }
    .d-tablet-block { display: block !important; }
}

/* Laptop Only (992px - 1199px) */
@media (min-width: 992px) and (max-width: 1080px) {
    .d-laptop-none { display: none !important; }
    .d-laptop-block { display: block !important; }
}

/* Desktop Only (≥ 1200px) */
@media (min-width: 1200px) {
    .d-desktop-none { display: none !important; }
    .d-desktop-block { display: block !important; }
}
```

### Text Alignment

```css
.text-center { text-align: center !important; }
.text-left { text-align: left !important; }
.text-right { text-align: right !important; }

/* Mobile-specific center alignment */
@media (max-width: 575.98px) {
    .text-mobile-center { text-align: center !important; }
}
```

### Flexbox Utilities

```css
.flex-column { flex-direction: column !important; }
.flex-row { flex-direction: row !important; }
.flex-wrap { flex-wrap: wrap !important; }
.justify-center { justify-content: center !important; }
.justify-between { justify-content: space-between !important; }
.align-center { align-items: center !important; }
.gap-sm { gap: var(--spacing-sm) !important; }
.gap-md { gap: var(--spacing-md) !important; }
.gap-lg { gap: var(--spacing-lg) !important; }
```

### Spacing Utilities

```css
/* Margin */
.m-0 { margin: 0 !important; }
.mt-auto { margin-top: auto !important; }
.mb-0 { margin-bottom: 0 !important; }
.mb-sm { margin-bottom: var(--spacing-sm) !important; }
.mb-md { margin-bottom: var(--spacing-md) !important; }
.mb-lg { margin-bottom: var(--spacing-lg) !important; }

/* Padding */
.p-0 { padding: 0 !important; }
.p-sm { padding: var(--spacing-sm) !important; }
.p-md { padding: var(--spacing-md) !important; }
.p-lg { padding: var(--spacing-lg) !important; }

/* Width */
.w-100 { width: 100% !important; }
.w-auto { width: auto !important; }
```

---

## Print Styles

Optimized output for printing:

```css
@media print {
    /* Hide non-essential elements */
    header.site-header,
    footer.site-footer,
    .nav-toggle,
    .quick-actions,
    .filter-buttons {
        display: none !important;
    }

    /* Remove padding from main content */
    main.main-content {
        padding: 0;
    }

    /* Full-width container */
    .container {
        max-width: 100%;
        padding: 0;
    }

    /* Clean colors for printing */
    body {
        background: white !important;
        color: black !important;
    }

    /* Show link URLs */
    a {
        text-decoration: underline;
    }

    a[href]::after {
        content: " (" attr(href) ")";
    }
}
```

---

## Summary

| Feature | Mobile | Tablet | Laptop | Desktop |
|---------|--------|--------|--------|---------|
| Navigation | Hamburger menu | Hamburger menu | Horizontal bar | Horizontal bar |
| Stats Grid | 2 columns | 2 columns | 4 columns | 4 columns |
| Equipment Grid | 1 column | 2 columns | 3 columns | 4 columns |
| Welcome Section | Stacked | Stacked | Side-by-side | Side-by-side |
| Footer | Stacked | Horizontal | Horizontal | Horizontal |
| Username | Hidden | Hidden | Visible | Visible |

This responsive design ensures a seamless user experience across all devices while maintaining performance and accessibility standards.
