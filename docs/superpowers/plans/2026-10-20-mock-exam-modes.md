# Mock and Exam Modes Implementation Plan

> **For agentic workers:** Execute inline task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Separate untimed Mock practice from timed Exam sessions and reveal answers on completion.

**Architecture:** Add a session type independent of existing question-pool filters. Mock sessions have no deadline; Exam sessions retain a configurable 90-minute default and auto-submit on expiry. Persist the session type with attempts and render answer explanations on the results page.

**Tech Stack:** React, TypeScript, Vitest, Vite.

## Global Constraints

- Preserve existing content filters: mixed, module, code, and wrong.
- Keep old saved attempts readable when session type is absent.
- Reveal answer keys only after submission; submissions navigate to results.

---

### Task 1: Session timing rules

**Files:** `src/utils/session.ts`, `src/tests/session.test.ts`

- [ ] Test that Mock has no deadline and Exam receives its selected deadline.
- [ ] Run the focused test and verify it fails because the session helper is missing.
- [ ] Implement the minimal helper and session type.
- [ ] Run the focused test again and verify it passes.

### Task 2: Setup and persisted mode

**Files:** `src/types/index.ts`, `src/utils/exams.ts`, `src/App.tsx`

- [ ] Add optional persisted mode to attempts and a session mode to exam configuration.
- [ ] Add two visible Mock/Exam choices to setup; retain existing pool filters.
- [ ] Derive deadline from the selected session mode, default Exam to 90 minutes, and persist the mode on submit.
- [ ] Show the selected mode in the active exam, results, and history views.

### Task 3: Answer reveal and verification

**Files:** `src/App.tsx`, `src/style.css`, `src/tests/session.test.ts`

- [ ] Render every selected question, including essay and written-code responses, with its answer/explanation or self-review rubric directly on the post-submit results page.
- [ ] Preserve existing detailed review filters and support historical attempts without a saved mode.
- [ ] Run `npm test` and `npm run build` from `frontend/`; check the local app endpoint.
