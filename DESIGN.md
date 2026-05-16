# Design Brief

## Direction

Namewala — An earth-rooted agricultural intelligence platform that brings modern digital clarity to rural Tanzanian farming, connecting users with expertise, services, and markets.

## Tone

Organic & grounded — warm earth tones avoiding generic tech blues, with editorial clarity meeting practical farming accessibility.

## Differentiation

Role-specific dashboards surface only relevant actions with agricultural context embedded in card hierarchies, bridging SaaS usability with Tanzanian farming authenticity. Three new feature expansions: specialist photo galleries for diagnosis confirmation, transport cost calculators with live time slot booking, and a calendar management system for crop and livestock activities.

## Color Palette

| Token      | OKLCH           | Role                                                |
| ---------- | --------------- | --------------------------------------------------- |
| primary    | 0.45 0.12 30    | Warm terracotta, primary agriculture & action CTAs |
| accent     | 0.5 0.1 160     | Muted sage green, health/growth/farm contexts       |
| success    | 0.65 0.12 95    | Harvest & completion indicators                    |
| warning    | 0.75 0.14 65    | Maintenance & service alerts                       |
| info       | 0.6 0.15 230    | Informational water/irrigation contexts             |
| background | 0.96 0.015 75   | Warm cream, accessible rural literacy              |
| card       | 0.98 0.01 75    | Light elevated surface for content sections        |
| muted      | 0.92 0.02 75    | Subtle background for secondary elements           |

## Typography

- Display: Lora — serif gravitas for headings, role badges, section titles
- Body: DM Sans — clean, readable sans-serif for labels, UI, market data
- Scale: hero `text-4xl font-bold tracking-tight`, h2 `text-2xl font-semibold`, label `text-sm font-medium`, body `text-base`

## New Feature Components

### Specialist Photo Gallery
- Grid layout (2-3 cols mobile, 4 cols desktop) with 1:1 aspect ratio images
- Camera + file upload buttons below gallery
- Recommended treatments text in primary accent color above gallery
- Event chips show diagnosis status (pending, confirmed, treatments applied)

### Transport Cost Calculator Modal
- Clean card-based form with rounded-lg borders, shadow-elevated
- Distance input slider with real-time calculation display in primary color
- Dynamic total cost shown in bold teal accent
- Time slot radio button selector (4-6 options, grid layout)
- Pickup & delivery address fields with placeholders
- Submit button (primary) and cancel button (secondary)
- Mobile: full-width inputs, stacked layout; desktop: 2-column grid

### Calendar Management Page
- Month view grid with 28-31 day cells (light background, hover states)
- Color-coded event chips: planting (primary), vaccination (accent), irrigation (info), maintenance (warning)
- Recurring event indicators (badge icon/label)
- Add event button (primary, sticky footer or top bar)
- Event details modal (read/edit/delete)
- Bilingual EN/SW: month names, event type labels, day headers
- Mobile: scroll-friendly day cells, large touch targets; desktop: full calendar grid

## Elevation & Depth

Subtle shadow hierarchy (shadow-sm for cards, no shadow for modals). Multiple background tones create depth: alternating card/background sections, sidebar elevation via bg-primary.

## Structural Zones

| Zone    | Background                | Border            | Notes                                         |
| ------- | ------------------------- | ----------------- | --------------------------------------------- |
| Header  | bg-card border-b          | border-border     | Role badge, title, navigation breadcrumbs     |
| Content | bg-background             | —                 | Main scrollable area, role-adaptive cards     |
| Modal   | bg-card shadow-elevated   | border-border     | Elevated surface, centered on overlay         |
| Sidebar | bg-primary/opacity-90     | border-r          | Role shortcuts, action stacks, status badges |
| Footer  | bg-muted/40 border-t      | border-border     | Support, settings, language toggle            |

## Spacing & Rhythm

Large sections gaps (gap-8) for readability, tight card padding (p-4) for density, micro-spacing (gap-2) within form groups. Rhythm alternates card and background every section. Modals use p-6 for breathing room.

## Component Patterns

- **Buttons**: Primary (bg-primary text-white rounded-md), secondary (bg-secondary outline), accent (bg-accent for tertiary)
- **Cards**: rounded-md, bg-card, shadow-sm, p-4, border-border for dashboard widgets
- **Badges**: Role-aware colors (farmer=primary, specialist=accent), rounded-full, text-xs font-semibold
- **Event Chips**: Semi-transparent backgrounds with borders (.event-chip-planting, .event-chip-health, etc.)
- **Grid Controls**: Radio buttons with accent color on selection, checkbox for multi-select

## Motion

Minimal entrance — cards fade-in on scroll (.fade-in 0.4s), modals slide-up (.slide-up 0.3s). Hover states darken interactive elements 3% via opacity. No bounce or playful animations; smooth transitions via --transition-smooth (0.3s cubic-bezier). Loading states use subtle opacity/scale transitions.

## Responsive Breakpoints

- **Mobile (sm)**: Single-column layouts, stacked modals, touch-friendly 44px+ tap targets
- **Tablet (md)**: 2-column grids, sidebar navigation collapsible
- **Desktop (lg)**: Full multi-column layouts, sidebar always visible, modals centered

## Constraints

- Use OKLCH tokens exclusively; no hex or arbitrary colors
- Mobile-first design with sm:/md:/lg: breakpoints
- Accessibility: >=7:1 contrast on all text, 4.5:1 minimum on interactive elements
- Role differentiation visible via badge, sidebar highlight, or card frame color
- All labels, placeholders, buttons, and event types support bilingual EN/SW

## Signature Detail

Embedded agricultural context in dashboard cards — weather widgets show rainfall for farming decisions, market prices align with crop/livestock types, notifications highlight role-specific alerts (pest risks for farmers, herd health for keepers), specialist photo galleries embed diagnosis workflows, transport calculators surface real-time logistics decisions, and calendar systems anchor productivity planning to regional seasons and market cycles. Namwala understands each user's unique agricultural journey.
