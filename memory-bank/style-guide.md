# STYLE GUIDE

## CODE STYLE
### TypeScript Guidelines
- **Strict Mode:** Enable strict TypeScript compilation
- **Type Definitions:** Explicit types for function parameters and returns
- **Interface vs Type:** Use interfaces for object shapes, types for unions/primitives
- **Generic Constraints:** Use generic constraints for type safety

### React Patterns
- **Functional Components:** Use function declarations with const
- **Hooks:** Custom hooks start with 'use' prefix
- **Props:** Destructure props in function signature
- **Event Handlers:** Prefix with 'handle' (e.g., handleClick)
- **Early Returns:** Use early returns for cleaner conditional rendering

### File Organization
- **Index Files:** Use barrel exports for clean imports
- **Component Files:** One component per file
- **Type Files:** Separate type definitions when complex
- **Constant Files:** Group related constants

## CHAKRA UI CONVENTIONS
### Component Usage
- **Always use Chakra UI v3 components** for styling HTML elements
- **Prefer composition** over custom CSS when possible
- **Use descriptive component names** from Chakra's design system
- **Implement responsive props** using Chakra's breakpoint system

### Accessibility Standards
- **ARIA Labels:** Add aria-label for interactive elements
- **Keyboard Navigation:** Support tabindex and keyboard events
- **Focus Management:** Proper focus handling for modals/drawers
- **Color Contrast:** Ensure WCAG compliance with color choices

### Theme Integration
- **Use theme tokens** for colors, spacing, and typography
- **Consistent spacing** using Chakra's space scale
- **Typography hierarchy** following theme font sizes
- **Color mode support** for dark/light themes

## NAMING CONVENTIONS
### Components
```typescript
// ✅ Good
const NoteEditor = () => { ... }
const UserProfileCard = () => { ... }

// ❌ Avoid
const noteEditor = () => { ... }
const userprofilecard = () => { ... }
```

### Files and Directories
```
// ✅ Good
components/NoteEditor/
hooks/useNoteEditor.ts
actions/createNote.ts

// ❌ Avoid  
Components/note-editor/
Hooks/UseNoteEditor.ts
Actions/create_note.ts
```

### Variables and Functions
```typescript
// ✅ Good
const handleNoteSubmit = () => { ... }
const isNoteLoading = true
const noteData = { ... }

// ❌ Avoid
const HandleNoteSubmit = () => { ... }
const is_note_loading = true
const NoteData = { ... }
```

## IMPORT/EXPORT PATTERNS
### Import Order
1. React and React-related imports
2. Third-party library imports
3. Internal shared imports
4. Relative imports
5. Type-only imports (separated)

```typescript
// ✅ Good
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/shared/components/ui'
import { useNoteData } from '@/shared/hooks'

import { NoteEditor } from './NoteEditor'

import type { Note } from '@/shared/types'
```

### Export Patterns
```typescript
// ✅ Prefer named exports
export const NoteEditor = () => { ... }
export { NoteEditor } from './NoteEditor'

// ✅ Use default exports sparingly (mainly for pages/routes)
export default function NotePage() { ... }
```

## PERFORMANCE GUIDELINES
### Optimization Patterns
- **React.memo:** Use for expensive re-renders
- **useMemo/useCallback:** Cache expensive computations/functions
- **Code Splitting:** Lazy load route components
- **Query Optimization:** Use TanStack Query efficiently

### Bundle Size Management
- **Tree Shaking:** Import only needed functions
- **Dynamic Imports:** Load heavy libraries conditionally
- **Asset Optimization:** Optimize images and media files

## ERROR HANDLING
### Error Boundaries
- **Component-level:** Wrap risky components
- **Route-level:** Catch routing errors
- **Global-level:** Catch unhandled errors

### API Error Handling
- **Consistent patterns** using TanStack Query error handling
- **User-friendly messages** instead of raw API errors
- **Retry logic** for transient failures
- **Loading states** during error recovery
