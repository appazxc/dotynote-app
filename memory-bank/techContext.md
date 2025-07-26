# TECHNICAL CONTEXT

## ARCHITECTURE OVERVIEW
**Framework:** React 18 with TypeScript  
**Build Tool:** Vite  
**State Management:** Redux Toolkit + TanStack Query  
**Routing:** TanStack Router  
**UI Library:** Chakra UI v3 + Ark UI  

## KEY DEPENDENCIES
### Core Framework
- React 18.x with TypeScript
- Vite for build tooling
- ESLint for code quality

### State & Data
- @reduxjs/toolkit: ^2.4.0
- @tanstack/react-query: ^5.28.4
- @tanstack/react-router: ^1.117.1

### UI & Styling  
- @chakra-ui/react: ^3.16.1
- @ark-ui/react: ^4.4.4
- @emotion/react: ^11.13.3

### Rich Text Editor
- @tiptap/core: ^2.3.0
- Multiple TipTap extensions for formatting

### Development Tools
- @tanstack/react-query-devtools
- @tanstack/react-router-devtools
- @sentry/react for error tracking

## PROJECT STRUCTURE
```
src/
├── desktop/          # Desktop-specific components & routes
├── mobile/           # Mobile-specific components & routes  
├── shared/           # Shared components, hooks, utils
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── api/          # API layer & hooks
│   ├── store/        # Redux store configuration
│   ├── theme/        # Chakra UI theme
│   └── types/        # TypeScript type definitions
```

## RESPONSIVE DESIGN
- Dual platform approach: desktop/ and mobile/ directories
- Shared components in shared/ directory
- Platform-specific routing and layouts
- Responsive breakpoints handled by Chakra UI

## API INTEGRATION
- TanStack Query for server state management
- API factory pattern in shared/api/
- Custom hooks for data fetching
- Mock service worker support for development
