# E-Venue Admin Dashboard Design Guidelines

## Design Approach

**Selected Approach**: Modern Data Dashboard System (inspired by Linear, Vercel Dashboard, and shadcn/ui design principles)

**Rationale**: This is a data-intensive admin application requiring clarity, efficiency, and scalability. The design prioritizes information hierarchy, quick scanning, and efficient workflows over visual flair.

**Core Principles**:
- Clarity over decoration
- Consistent patterns for rapid learning
- Information density balanced with breathing room
- Action-oriented design for admin workflows

---

## Typography System

**Font Stack**: Inter or similar system font via Google Fonts CDN

**Hierarchy**:
- Page Titles: text-2xl md:text-3xl, font-semibold
- Section Headers: text-xl, font-semibold
- Card/Widget Titles: text-lg, font-medium
- Body Text: text-sm, font-normal
- Labels: text-xs md:text-sm, font-medium, uppercase tracking
- Data/Numbers: text-base, font-mono (for IDs, counts)
- Table Headers: text-xs, font-medium, uppercase

**Line Heights**: Use default Tailwind (leading-normal for body, leading-tight for headings)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, and 12 consistently
- Tight spacing: p-2, gap-2
- Standard spacing: p-4, gap-4, mb-6
- Section spacing: p-6, py-8, gap-8
- Large spacing: p-12 (only for login page)

**Page Structure**: All dashboard pages follow this pattern:
- Page header with title and actions (mb-6)
- Stats/summary cards if applicable (mb-8)
- Main content area with tables/grids
- Consistent page padding: p-4 md:p-6 lg:p-8

**Grid Systems**:
- Stats cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4, gap-4
- Venue cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-4
- Table layouts: Full width with horizontal scroll on mobile

---

## Component Library

### Navigation: Sidebar
- Collapsible sidebar using shadcn/ui SidebarProvider
- Width: Default expanded, collapses to icon-only on mobile
- Active state: Subtle background fill, border accent
- Icons: Lucide React (Home, Users, CheckCircle, Clock, MapPin, Calendar)
- Logo area at top with app name "E-Venue Admin"
- Logout button at bottom of sidebar

### Dashboard Home: Stats Cards
- 4 stat cards in grid layout
- Each card: Rounded corners (rounded-lg), border, p-6
- Icon + Label (text-sm, muted) + Large Number (text-3xl, font-bold) + Trend indicator if applicable
- Icons: Lucide React (Users, UserCheck, Building, CalendarDays)

### Data Tables
- shadcn/ui Table component
- Sticky header on scroll
- Row hover state: subtle background change
- Alternating row colors: Optional subtle stripe
- Cell padding: px-4 py-3
- Actions column: Right-aligned with icon buttons
- Empty state: Centered message with icon
- Mobile: Horizontal scroll with min-width constraints

### Forms (Login, Add Venue)
- Login: Centered card layout, max-w-md, with logo/title at top
- Form fields: Vertical stack with gap-4
- Labels: Above inputs, text-sm font-medium
- Inputs: Full width, h-10, rounded-md border
- Buttons: Full width on forms, h-10
- Error messages: text-sm text-destructive below inputs

### Action Buttons
- Primary: Filled background, prominent for main actions
- Secondary: Outlined for secondary actions
- Destructive: Red variant for delete/reset operations
- Icon buttons: Square, p-2, for table actions
- Size variants: Default (h-10), sm (h-8) for compact spaces

### Cards & Containers
- Standard card: Rounded-lg border, p-6
- Compact card (venue cards): Rounded-lg border, p-4
- Section containers: Rounded-lg border background-card

### Status Badges
- Verified: Green background, rounded-full px-3 py-1
- Pending: Yellow/amber background
- Booked: Blue background
- Size: text-xs font-medium

### Dialogs & Modals
- shadcn/ui Dialog component
- Add Venue: Form dialog with date/time/capacity inputs
- Confirm dialogs: For delete/reset operations with warning state
- Max width: max-w-lg, centered overlay

### Loading States
- Table loading: Skeleton rows with shimmer effect
- Button loading: Spinner icon + disabled state
- Page loading: Centered spinner

---

## Page-Specific Layouts

### Login Page
- Full viewport height with flex centering
- Card: max-w-md, p-8 md:p-12
- Logo/icon at top (h-12 w-12)
- Title: text-2xl font-bold mb-6
- Form fields stacked vertically
- Submit button: Full width, mt-6

### Dashboard Home
- 4 stat cards grid at top
- Optional: Recent activity timeline or quick actions section below stats
- Responsive grid collapses to single column on mobile

### Verified/Pending Teachers
- Page header with title + optional search/filter
- Action buttons in header (e.g., "Reset Bookings")
- Data table with columns: ID, Name, Email, Phone, Venues Booked, Actions
- Pending: Additional "Verify" action button per row
- Pagination if needed at table bottom

### Venues Page
- Header with "Add Venue" button (top-right)
- Grid layout showing venue cards
- Each card: Date, Time, Capacity/Booked count, Delete button
- Add Venue dialog: Form with date picker, time input, capacity number input

### Booked Page
- Grouped by exam venue
- Expandable sections for each venue showing enrolled teachers
- Each section: Venue info header + teacher list table
- Teacher list: Compact table with Name, ID, Email, Booking status

---

## Visual Design Notes

- **Borders**: Subtle, consistent throughout (border-border from Tailwind config)
- **Shadows**: Minimal use, primarily on cards (shadow-sm)
- **Rounded Corners**: Consistent rounded-lg for cards, rounded-md for inputs/buttons
- **Icons**: Lucide React, size-4 or size-5, paired with text for clarity
- **Empty States**: Centered with icon (size-12), muted text, and optional CTA button
- **Responsive Behavior**: Mobile-first, sidebar collapses, tables scroll, grids stack

---

## Accessibility

- All interactive elements have clear focus states (ring-2 ring-ring)
- Form labels properly associated with inputs
- Button text clearly describes actions
- Color not sole indicator (use icons + text for status)
- Adequate contrast ratios for text
- Keyboard navigation fully supported via shadcn/ui components

---

## Images

**No hero images needed**. This is a utilitarian admin dashboard where images would distract from data-driven workflows. Focus on clean iconography from Lucide React for visual hierarchy and wayfinding.