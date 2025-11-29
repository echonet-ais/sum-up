# Git Flow Documentation

> **Project**: Litmers  
> **Version**: 1.0  
> **Date**: 2025-01-XX  
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose
This document describes the Git workflow and branching strategy for the Litmers project.

### 1.2 Branch Strategy
- **main**: Production-ready code
- **dev**: Development branch
- **feature/***: Feature branches
- **fix/***: Bug fix branches
- **hotfix/***: Hotfix branches

---

## 2. Branch Structure

### 2.1 Main Branches

#### 2.1.1 main
- Production-ready code
- Protected branch
- Only merged via Pull Request from `dev`
- Tagged releases

#### 2.1.2 dev
- Development integration branch
- All feature branches merge here
- Direct merge allowed (no PR required)
- Regular merges from feature branches

---

## 3. Branch Workflow

### 3.1 Feature Development

#### 3.1.1 Creating a Feature Branch
```bash
# Start from dev
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/feature-name

# Or using shorthand
git checkout -b feature/feature-name dev
```

#### 3.1.2 Working on Feature
```bash
# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/feature-name
```

#### 3.1.3 Merging to dev
```bash
# Switch to dev
git checkout dev
git pull origin dev

# Merge feature branch (direct merge, no PR)
git merge feature/feature-name

# Push to remote
git push origin dev

# Delete feature branch (optional)
git branch -d feature/feature-name
git push origin --delete feature/feature-name
```

### 3.2 Bug Fixes

#### 3.2.1 Creating a Fix Branch
```bash
# Start from dev
git checkout dev
git pull origin dev

# Create fix branch
git checkout -b fix/bug-description
```

#### 3.2.2 Merging Fix to dev
```bash
# Same process as feature branches
git checkout dev
git pull origin dev
git merge fix/bug-description
git push origin dev
```

### 3.3 Hotfixes

#### 3.3.1 Creating a Hotfix Branch
```bash
# Start from main
git checkout main
git pull origin main

# Create hotfix branch
git checkout -b hotfix/hotfix-description
```

#### 3.3.2 Merging Hotfix
```bash
# Merge to main
git checkout main
git merge hotfix/hotfix-description
git push origin main

# Merge to dev
git checkout dev
git merge hotfix/hotfix-description
git push origin dev

# Delete hotfix branch
git branch -d hotfix/hotfix-description
git push origin --delete hotfix/hotfix-description
```

---

## 4. Commit Message Convention

### 4.1 Format
```
type: short description (max 50 chars)

Longer description if needed
- Bullet points for details
- Reference issue numbers

Fixes #123
```

### 4.2 Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

### 4.3 Guidelines
- Use English
- Use imperative mood
- Keep first line under 50 characters
- Focus on main/feature changes
- Keep description under 3 lines when possible
- Reference issues when applicable

### 4.4 Examples
```
feat: add user authentication

fix: resolve login redirect issue

docs: update API documentation

refactor: simplify component structure
```

---

## 5. Pull Request Process

### 5.1 PR to dev Branch
- **Not Required**: Direct merge allowed
- Use for code review if needed
- Use for discussion if needed

### 5.2 PR to main Branch
- **Required**: All merges to main must go through PR
- Requires at least one approval
- All checks must pass
- Clear description required

### 5.3 PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring
- [ ] Other

## Related Issues
Closes #123

## Testing
- [ ] Tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project conventions
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] Error handling implemented
```

---

## 6. Remote Repository

### 6.1 Remote URL
```
https://github.com/gr22nist/litmers.git
```

### 6.2 Setting Up Remote
```bash
# Check current remote
git remote -v

# Add remote (if not set)
git remote add origin https://github.com/gr22nist/litmers.git

# Update remote URL (if needed)
git remote set-url origin https://github.com/gr22nist/litmers.git
```

---

## 7. Common Workflows

### 7.1 Starting New Feature
```bash
# Update dev
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/new-feature

# Start development
```

### 7.2 Daily Workflow
```bash
# Start from feature branch
git checkout feature/feature-name

# Pull latest changes from dev
git pull origin dev

# Make changes and commit
git add .
git commit -m "feat: description"

# Push to remote
git push origin feature/feature-name
```

### 7.3 Completing Feature
```bash
# Ensure all changes are committed
git status

# Switch to dev
git checkout dev
git pull origin dev

# Merge feature
git merge feature/feature-name

# Push to remote
git push origin dev

# Delete local branch
git branch -d feature/feature-name

# Delete remote branch
git push origin --delete feature/feature-name
```

### 7.4 Syncing with Remote
```bash
# Fetch latest changes
git fetch origin

# Update local branch
git pull origin branch-name

# Or rebase (if preferred)
git pull --rebase origin branch-name
```

---

## 8. Best Practices

### 8.1 Branch Management
- Keep branches focused on single feature/fix
- Delete merged branches regularly
- Keep branch names descriptive
- Use consistent naming convention

### 8.2 Commit Practices
- Commit often with meaningful messages
- Keep commits atomic (one logical change)
- Don't commit broken code
- Review changes before committing

### 8.3 Merge Practices
- Always pull latest changes before merging
- Resolve conflicts carefully
- Test after merging
- Keep merge commits clean

### 8.4 Communication
- Update team on branch status
- Communicate breaking changes
- Document complex changes
- Reference issues in commits

---

## 9. Troubleshooting

### 9.1 Common Issues

#### Merge Conflicts
```bash
# Pull latest changes
git pull origin branch-name

# Resolve conflicts in files
# Edit conflicted files

# Stage resolved files
git add .

# Complete merge
git commit -m "merge: resolve conflicts"
```

#### Undo Last Commit
```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes
git reset --hard HEAD~1
```

#### Update Branch from dev
```bash
# Switch to feature branch
git checkout feature/feature-name

# Merge latest dev
git merge dev

# Or rebase (if preferred)
git rebase dev
```

---

## 10. Release Process

### 10.1 Preparing Release
```bash
# Ensure dev is up to date
git checkout dev
git pull origin dev

# Create release branch (optional)
git checkout -b release/v1.0.0

# Make final adjustments
# Update version numbers
# Update changelog

# Merge to main via PR
```

### 10.2 Tagging Releases
```bash
# After merging to main
git checkout main
git pull origin main

# Create tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag
git push origin v1.0.0
```

---

## 11. Quick Reference

### 11.1 Common Commands
```bash
# Branch operations
git checkout -b feature/name
git branch -d branch-name
git branch -a

# Status and diff
git status
git diff
git log --oneline

# Remote operations
git fetch origin
git pull origin branch-name
git push origin branch-name

# Merge operations
git merge branch-name
git rebase branch-name
```

### 11.2 Workflow Summary
1. Create feature branch from dev
2. Develop and commit changes
3. Merge to dev (direct merge)
4. Create PR from dev to main
5. Review and merge to main
6. Tag release if needed

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-XX | Initial | Initial Git flow documentation |

---

**End of Document**

