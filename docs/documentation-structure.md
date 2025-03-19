# Documentation Structure

This document explains how documentation is organized in the YouTube Focus Saver project.

## Overview

Documentation is divided into the following categories:

1. **Project Information** - Core information about the project goals, architecture, and structure
2. **Development Guides** - Guidelines and best practices for developers
3. **Backend Documentation** - Details about the backend implementation
4. **Project Progress** - Tracking of changes and development activities

## Directory Structure

```
docs/
├── README.md                    # Documentation index
├── documentation-structure.md   # This file
├── project-requirements.md      # Project goals and requirements
├── tech-stack.md               # Technologies used
├── app-flow.md                 # User and application flow
├── frontend-guidelines.md      # Frontend best practices
├── backend-structure.md        # Backend architecture overview
│
├── backend/                    # Backend-specific documentation
│   ├── supabase.md             # Supabase setup guide
│   ├── database-schema.md      # Detailed schema documentation
│   ├── schema.sql              # Full SQL schema
│   ├── apply-migrations.js     # Migration script
│   ├── .env.example            # Environment variables template
│   └── migrations/             # Database migration files
│       └── 00001_initial_schema.sql  # Initial schema migration
│
├── guides/                     # Developer and user guides
│   └── explain.md              # Beginner-friendly explanations
│
└── progress/                   # Development progress tracking
    └── project_progress.md     # Development log
```

## Documentation Guidelines

When adding or updating documentation:

1. **Location**: Place new files in the appropriate subdirectory based on their content
2. **Linking**: Update the main README.md with links to new documentation
3. **Naming**: Use kebab-case for filenames (e.g., `file-name.md`)
4. **Markdown**: Write documentation in Markdown format
5. **Headers**: Use proper header hierarchy (# for title, ## for sections, etc.)
6. **Code Blocks**: Use ```language for code blocks with proper syntax highlighting
7. **Tables**: Use Markdown tables for structured data

## Updating Process

When making significant changes to the project:

1. Update technical documentation in the appropriate files
2. Add a new entry to `progress/project_progress.md` with:
   - Date and time
   - Task description
   - Files affected
   - Details of changes
   - Reason or context for changes

3. Add beginner-friendly explanations to `guides/explain.md` if the change affects user-facing functionality

## Documentation TODOs

- [ ] Add user guide for extension installation and usage
- [ ] Create API documentation for services
- [ ] Add development setup guide
- [ ] Add troubleshooting section 