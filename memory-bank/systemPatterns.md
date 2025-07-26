# SYSTEM PATTERNS

## ARCHITECTURAL PATTERNS
### Component Architecture
- **Atomic Design:** Components organized by complexity (ui/ shared components)
- **Platform Separation:** desktop/ and mobile/ specific implementations
- **Shared Core:** Common logic in shared/ directory
- **Feature Modules:** Organized by domain (noteTab, space, billing, etc.)

### State Management Patterns
- **Redux Toolkit:** Global state management with slices
- **TanStack Query:** Server state caching and synchronization  
- **Local State:** React useState for component-specific state
- **Form State:** TanStack Form for complex form handling

### Routing Patterns
- **File-Based Routing:** TanStack Router with route files
- **Nested Layouts:** Layout components for consistent UI structure
- **Route Guards:** Authentication and authorization checks
- **Platform Routes:** Separate routing trees for desktop/mobile

## CODE ORGANIZATION PATTERNS
### Directory Structure
```
feature/
├── components/     # Feature-specific components
├── hooks/         # Custom hooks for the feature  
├── actions/       # Redux actions and thunks
├── selectors/     # Redux selectors
└── index.ts       # Public API exports
```

### Naming Conventions
- **Components:** PascalCase (e.g., NoteEditor)
- **Files:** camelCase (e.g., noteEditor.tsx)
- **Hooks:** usePascalCase (e.g., useNoteEditor)
- **Actions:** camelCase verbs (e.g., createNote)
- **Types:** PascalCase with suffix (e.g., NoteEntity)

### Import/Export Patterns
- **Barrel Exports:** index.ts files for clean imports
- **Named Exports:** Preferred over default exports
- **Type-Only Imports:** Explicit type imports where applicable

## DATA FLOW PATTERNS
### API Data Flow
1. **Component** → **Custom Hook** → **TanStack Query**
2. **Query Hook** → **API Factory** → **HTTP Request**
3. **Response** → **Schema Validation** → **Type-Safe Data**
4. **Cache Update** → **Component Re-render**

### State Updates
1. **User Action** → **Event Handler** → **Redux Action**
2. **Action** → **Reducer** → **State Update**
3. **Selector** → **Component** → **UI Update**

## UI PATTERNS
### Chakra UI Integration
- **Theme Customization:** Centralized theme configuration
- **Component Composition:** Building complex UI from simple components
- **Responsive Design:** Breakpoint-based responsive patterns
- **Color Mode:** Dark/light theme support

### Form Patterns
- **TanStack Form:** Complex form state management
- **Validation:** Schema-based validation with resolvers
- **Error Handling:** Consistent error display patterns
- **Accessibility:** ARIA labels and keyboard navigation

## TESTING PATTERNS
*To be documented as testing infrastructure develops*

## PERFORMANCE PATTERNS
- **Code Splitting:** Route-based lazy loading
- **Query Optimization:** TanStack Query caching strategies
- **Bundle Optimization:** Vite build optimizations
- **Image Optimization:** Blurhash for progressive loading
