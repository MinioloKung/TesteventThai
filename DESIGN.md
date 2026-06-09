---
name: TestDashboard
description: Clean and professional user management console
colors:
  primary: "#4f46e5"
  primary-hover: "#4338ca"
  neutral-bg: "#f8fafc"
  neutral-fg: "#0f172a"
  neutral-border: "rgba(226, 232, 240, 0.5)"
  danger: "#e11d48"
  danger-hover: "#be123c"
typography:
  display:
    fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-danger-hover:
    backgroundColor: "{colors.danger}"
    textColor: "#ffffff"
---

# Design System: TestDashboard

## 1. Overview

**Creative North Star: "The Blueprint Console"**

The Blueprint Console is an administrative system design characterized by precise grid alignments, crisp typography, clean slate surfaces, and intentional indigo highlights. It is optimized for developer tools and user directories, trading decorative gradients and heavy shadows for typographic hierarchy and clear layout borders.

This system rejects visual clutter, excessive card rounding, and unneeded decorative blurs. The layout follows a professional, technical aesthetic that prioritizes content visibility, information density, and rapid navigation.

**Key Characteristics:**
- **Crisp Alignment**: Grid-aligned elements with strict borders and consistent margins.
- **Flat Layout**: Surfaces are layered using background tones and 1px lines rather than heavy shadows.
- **Restrained Accents**: Color is applied only to callouts, interactive states, and active items.

## 2. Colors

The color palette is built on neutral slate tones with bright indigo highlights for actions and focus states.

### Primary
- **Indigo Precision** (#4f46e5): Used for main interactive controls, buttons, active page navigation, and focused input indicators.

### Neutral
- **Slate Ink** (#0f172a): Used for body text, titles, and dark mode backgrounds.
- **Slate Canvas** (#f8fafc): Used for main application backgrounds and page content blocks.
- **Slate Outline** (rgba(226, 232, 240, 0.5)): Used for 1px container and card boundaries.

### Named Rules
**The Indigo-Constraint Rule.** Indigo is reserved only for primary calls-to-action, success states, and focus rings. It must never cover more than 10% of any given screen layout.

## 3. Typography

The system uses a clean, modern sans-serif typography stack optimized for legibility and structural hierarchy.

**Display Font:** Helvetica Neue (with fallback Arial, sans-serif)
**Body Font:** Helvetica Neue (with fallback Arial, sans-serif)

**Character:** Clean, objective, and highly legible. The pairing relies on strong weight differences (Extra Bold vs. Regular) to separate UI structure from content.

### Hierarchy
- **Display** (Bold 800, 1.875rem (30px), line-height 1.2): Used for page-level headers and key titles.
- **Headline** (Semi-bold 700, 1.5rem (24px), line-height 1.25): Used for section headers.
- **Title** (Bold 700, 1.125rem (18px), line-height 1.3): Used for cards and secondary listings.
- **Body** (Regular 400, 0.875rem (14px), line-height 1.5): Used for paragraph content and grid items.
- **Label** (Bold 600, 0.75rem (12px), letter-spacing 0.05em, uppercase): Used for tags, labels, and helper text.

### Named Rules
**The Line-Length Rule.** Long form text and descriptions must have a maximum width of 70 characters (70ch) to prevent horizontal eye fatigue.

## 4. Elevation

The Blueprint Console is flat by default. Surfaces are distinguished by color shade transitions and borders rather than shadow depth.

### Named Rules
**The Flat-by-Default Rule.** Cards, tables, and buttons remain flat. Shadows are strictly prohibited at rest and are only applied to floating elements like dialog modals and toast alerts.

## 5. Components

### Buttons
- **Shape:** Softly curved corners (12px / rounded-xl).
- **Primary:** Indigo-600 background, white text, 10px 20px padding.
- **Hover / Focus:** Indigo-700 background. Focus ring is 2px Indigo-500 with a offset border.

### Cards / Containers
- **Corner Style:** Rounded-2xl (16px).
- **Background:** White bg on light mode, slate-800 on dark mode.
- **Shadow Strategy:** Flat at rest; no shadows are applied.
- **Border:** 1px Slate-200/50.
- **Internal Padding:** 24px (6rem).

### Inputs / Fields
- **Style:** 1px slate-200/50 border, white background.
- **Focus:** Border transitions to Indigo-500, with a 2px Indigo-500/20 glow ring.

### Navigation
- **Style:** Sticky top-bar, white/80 background with backdrop blur, 1px bottom border.

## 6. Do's and Don'ts

### Do:
- **Do** use strict 1px borders to separate content containers instead of shadows.
- **Do** align all text elements to a consistent grid.
- **Do** display ID tags using uppercase labels.
- **Do** limit border-radius values to a maximum of 16px.

### Don't:
- **Don't** use text-clipping with gradients (no text-transparent bg-clip-text).
- **Don't** use side-stripe color accents on cards or containers.
- **Don't** use decorative shadows (M >= 16px blur) on standard data cards.
- **Don't** allow cards to have a border-radius of 32px or more.
