# YouTube Focus Saver - Frontend Guidelines

This document outlines the UI and design guidelines for the YouTube Focus Saver Chrome extension, ensuring consistency across the application.

## 1. Design System

### Color Palette

#### Light Mode
- **Primary**: `#2563eb` (Blue-600)
- **Secondary**: `#ef4444` (Red-600, for YouTube-related actions)
- **Background**: `#f9fafb` (Gray-50)
- **Card Background**: `#ffffff` (White)
- **Text Primary**: `#111827` (Gray-900)
- **Text Secondary**: `#4b5563` (Gray-600)
- **Text Tertiary**: `#9ca3af` (Gray-400)
- **Border**: `#e5e7eb` (Gray-200)

#### Dark Mode
- **Primary**: `#3b82f6` (Blue-500)
- **Secondary**: `#f87171` (Red-400, for YouTube-related actions)
- **Background**: `#111827` (Gray-900)
- **Card Background**: `#1f2937` (Gray-800)
- **Text Primary**: `#f9fafb` (Gray-50)
- **Text Secondary**: `#d1d5db` (Gray-300)
- **Text Tertiary**: `#6b7280` (Gray-500)
- **Border**: `#374151` (Gray-700)

### Typography

- **Font Family**: System fonts stack
  ```css
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  ```

- **Font Sizes**:
  - Heading (Large): 18px (1.125rem)
  - Heading (Medium): 16px (1rem)
  - Body: 14px (0.875rem)
  - Small: 12px (0.75rem)
  - Tiny: 10px (0.625rem)

- **Line Heights**:
  - Headings: 1.25
  - Body: 1.5

### Spacing

- **Base Unit**: 4px
- **Spacing Scale**:
  - xs: 4px (0.25rem)
  - sm: 8px (0.5rem)
  - md: 16px (1rem)
  - lg: 24px (1.5rem)
  - xl: 32px (2rem)

### Shadows

- **Card Shadow (Light)**: `0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)`
- **Card Shadow (Dark)**: `0 1px 3px rgba(0, 0, 0, 0.25)`
- **Hover Shadow**: `0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)`

### Border Radius

- **Small**: 4px (0.25rem)
- **Default**: 8px (0.5rem)
- **Large**: 12px (0.75rem)
- **Round**: 9999px (for buttons with circular appearance)

## 2. Component Guidelines

### Buttons

#### Primary Button
- Blue background
- White text
- 8px border radius
- Hover state: slightly darker blue
- Focus state: blue with focus ring

#### Secondary Button
- Gray background
- Dark text
- 8px border radius
- Hover state: slightly darker gray

#### Icon Button
- Square or round shape
- Transparent background
- Icon centered
- Hover state: light gray background

### Cards

- White background (light mode) / Gray-800 background (dark mode)
- 8px border radius
- Light shadow
- 16px padding
- Hover state: slightly elevated shadow

### Forms

#### Input Fields
- Full width
- 8px border radius
- Light border
- 8-12px padding
- Focus state: blue border with light blue ring

#### Checkboxes
- Square shape
- Blue when checked
- Gray border when unchecked
- 4px border radius

#### Dropdowns
- Same styling as input fields
- Chevron icon indicating dropdown functionality

### Lists

- No bullet points
- 8-12px vertical spacing between items
- Optional dividers between items

## 3. Layout Guidelines

### Popup Dimensions
- **Width**: 350px
- **Height**: 400px

### General Layout
- 16px padding around all content edges
- Stack layout for primary sections
- Grid layout for video cards (1 column on small screens, 2 columns on larger screens)

### Responsive Adaptations
- Single column layout for video grid when space is limited
- Truncated text with ellipsis for long titles
- Scrollable containers for overflow content

## 4. Interaction Patterns

### Transitions
- **Duration**: 150ms-300ms
- **Easing**: ease-in-out
- **Properties**: opacity, transform, background-color

### Hover States
- Subtle background color changes
- Shadow elevation for cards
- Color saturation increases

### Focus States
- Visible focus rings for accessibility
- High contrast between focus indicator and background
- Keyboard navigation support

### Loading States
- Spinner animation for loading data
- Skeleton screens for content loading
- Disabled state for buttons during loading

## 5. Accessibility Guidelines

### Color Contrast
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Avoid color as the only means of conveying information

### Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Visible focus indicators

### Screen Readers
- Meaningful alt text for images
- ARIA labels for non-standard controls
- Proper heading hierarchy

### Dark Mode
- Automatic detection of system preference
- Manual toggle in settings
- Sufficient contrast in both modes

## 6. Implementation with Tailwind CSS

### Tailwind Configuration
- Extended theme with custom colors
- Dark mode using the 'class' strategy
- Custom plugins as needed

### Utility Class Patterns
- Use Tailwind's utility classes directly in components
- Extract common patterns to component classes
- Use `@apply` for complex, repeating patterns only

### Example Component
```jsx
// Video Card Example
<div className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow">
  <div className="relative">
    <img 
      src={thumbnailUrl} 
      alt={title} 
      className="w-full h-36 object-cover"
    />
  </div>
  <div className="p-4">
    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-xs">{channelName}</p>
  </div>
</div>
```
