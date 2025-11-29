# Collaboration Guidelines

> **Project**: Litmers  
> **Version**: 1.0  
> **Date**: 2025-01-XX  
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose
This document defines collaboration guidelines for the Litmers project team.

### 1.2 Scope
- Code style and conventions
- Communication guidelines
- Code review process
- Issue management
- Documentation standards

---

## 2. Code Style and Conventions

### 2.1 TypeScript
- Use TypeScript for all new code
- Enable strict mode
- Define types for all function parameters and return values
- Use interfaces for object shapes
- Use type aliases for unions and intersections

### 2.2 Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useUserData.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Files**: Match the exported name (e.g., `UserProfile.tsx` exports `UserProfile`)

### 2.3 File Structure
- One component per file
- Co-locate related files (components, hooks, types)
- Use index files for clean imports
- Group by feature, not by type

### 2.4 Code Formatting
- Use ESLint for linting
- Use Prettier for formatting (if configured)
- Consistent indentation (2 spaces)
- Trailing commas in multi-line structures
- Single quotes for strings (if configured)

---

## 3. Component Guidelines

### 3.1 Component Structure
```typescript
// Imports
import React from 'react';
import type { ComponentProps } from './types';

// Types
interface Props {
  // ...
}

// Component
export default function ComponentName({ prop1, prop2 }: Props) {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
  return (
    // JSX
  );
}
```

### 3.2 Component Best Practices
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over configuration
- Prefer function components over class components
- Use TypeScript for all props

### 3.3 State Management
- Use local state for component-specific data
- Use context for shared state (sparingly)
- Consider state management library for complex state
- Keep state as close to where it's used as possible

---

## 4. Git Workflow

### 4.1 Branch Strategy
- `main`: Production-ready code
- `dev`: Development branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches
- `hotfix/*`: Hotfix branches

### 4.2 Commit Messages
- Use English
- Use imperative mood
- Keep first line under 50 characters
- Add detailed description if needed
- Reference issues if applicable

**Format**:
```
type: short description (max 50 chars)

Longer description if needed
- Bullet points for details
- Reference issue numbers

Fixes #123
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

### 4.3 Pull Request Process
- Create PR from feature branch to `dev` (direct merge)
- Create PR from `dev` to `main` (requires review)
- Include clear description
- Reference related issues
- Ensure all checks pass
- Request review from at least one team member

---

## 5. Code Review Guidelines

### 5.1 Review Checklist
- Code follows project conventions
- TypeScript types are properly defined
- No console.logs or debug code
- Error handling is implemented
- Tests are included (if applicable)
- Documentation is updated

### 5.2 Review Process
- Be constructive and respectful
- Focus on code, not the person
- Suggest improvements, not just point out issues
- Approve when satisfied
- Request changes when necessary

### 5.3 Responding to Reviews
- Address all comments
- Ask for clarification if needed
- Update code and push changes
- Mark comments as resolved when done

---

## 6. Communication

### 6.1 Channels
- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: General discussions
- Pull Requests: Code review discussions
- Commit messages: Change descriptions

### 6.2 Communication Guidelines
- Be clear and concise
- Use English for technical discussions
- Reference issues and PRs when relevant
- Update documentation when making changes

---

## 7. Issue Management

### 7.1 Issue Labels
- `bug`: Something isn't working
- `feature`: New feature request
- `enhancement`: Improvement to existing feature
- `documentation`: Documentation improvements
- `question`: Questions or discussions
- `help wanted`: Extra attention is needed

### 7.2 Issue Template
- Clear title
- Description of the issue
- Steps to reproduce (for bugs)
- Expected behavior
- Actual behavior
- Environment information
- Screenshots (if applicable)

---

## 8. Documentation Standards

### 8.1 Code Documentation
- Document all public APIs
- Use JSDoc comments for functions
- Explain complex logic
- Include examples when helpful

### 8.2 README Updates
- Update README when adding new features
- Document new environment variables
- Update installation instructions if needed
- Keep project structure up to date

### 8.3 Documentation Files
- Keep docs in `docs/` folder
- Use Markdown format
- Keep documents up to date
- Review and update regularly

---

## 9. Testing Guidelines

### 9.1 Test Coverage
- Write tests for critical functionality
- Test edge cases
- Test error handling
- Maintain test coverage

### 9.2 Test Structure
- One test file per source file
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests independent

---

## 10. Performance Guidelines

### 10.1 Optimization Principles
- Measure before optimizing
- Focus on user-perceived performance
- Optimize critical rendering path
- Use code splitting
- Lazy load when appropriate

### 10.2 Best Practices
- Avoid unnecessary re-renders
- Use React.memo when appropriate
- Optimize images and assets
- Minimize bundle size
- Use production builds for testing

---

## 11. Security Guidelines

### 11.1 Security Best Practices
- Never commit secrets or API keys
- Use environment variables for sensitive data
- Validate and sanitize user input
- Keep dependencies up to date
- Review security advisories

### 11.2 Dependency Management
- Regularly update dependencies
- Review dependency changes
- Use lock files
- Audit for vulnerabilities

---

## 12. Project-Specific Guidelines

### 12.1 Technology Stack
- Next.js 16.0.3
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4

### 12.2 Project Structure
- Follow established folder structure
- Keep related files together
- Use consistent naming
- Maintain clear separation of concerns

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-XX | Initial | Initial collaboration guidelines creation |

---

**End of Document**

