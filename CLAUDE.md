# Tengri Tagh Uyghur Cuisine - Restaurant Website

## Project Overview
A modern restaurant website for **Tengri Tagh Uyghur Cuisine**, built with Next.js, TypeScript, and Tailwind CSS.

## Multi-Agent Orchestration

This project uses a multi-agent workflow. The **scrum-master** agent is the primary orchestrator.

### Agent Roles
| Agent | Role | When to Use |
|-------|------|-------------|
| `product-manager` | Writes PRDs, user stories, acceptance criteria | Feature definition |
| `ui-designer` | Design system, component specs, layouts | UI/UX decisions |
| `architect` | Tech architecture, data models, project structure | Technical decisions |
| `scrum-master` | Sprint planning, coordination, progress tracking | Orchestration |
| `fullstack-dev` | Implements features in TypeScript/React | Code implementation |
| `qa-engineer` | Playwright E2E tests | Testing & verification |

### Development Workflow
1. **product-manager** writes PRD and user stories
2. **ui-designer** creates design specs
3. **architect** defines technical approach
4. **scrum-master** creates sprint plan
5. **fullstack-dev** implements (in worktree for parallel work)
6. **qa-engineer** writes and runs Playwright tests
7. PR created, **Codex** reviews via `codex-review.sh` hook
8. Iterate until Codex approves, then merge

### PR Review with Codex
```bash
.claude/hooks/codex-review.sh <pr-number>
```

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui
- Drizzle ORM + SQLite
- Playwright (E2E tests)
- Vitest (unit tests)
- pnpm

## Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Run linter
pnpm test         # Run Vitest
pnpm test:e2e     # Run Playwright tests
```

## Project Structure
```
docs/
  prd/              # Product requirements
  design/           # Design system & specs
  architecture/     # Architecture docs
  stories/          # User stories
  sprints/          # Sprint boards
src/
  app/              # Next.js App Router pages
  components/       # React components
    ui/             # Reusable UI components
  db/               # Database schema & queries
  types/            # Shared TypeScript types
  lib/              # Utility functions
tests/
  e2e/              # Playwright E2E tests
```
