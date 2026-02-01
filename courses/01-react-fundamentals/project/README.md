# React Fundamentals Project

This is a **real, runnable React application** where you'll work on challenges by modifying the code.

## 🚀 Getting Started

### 1. Install Dependencies

**Note:** If you haven't run setup yet, go to repo root and run `npm run setup` first to install all dependencies and Playwright browsers.

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Work on Challenges

Do challenges **in order, one at a time**: read the first challenge README, solve it, run review, then move on to the next. You don't need to read all challenge files upfront. Each README is self-contained for that step.

- **Challenge 01**: `challenges/01-static-task-display/README.md`
- **Challenge 02**: `challenges/02-dynamic-task-rendering/README.md`
- **Challenge 03**: `challenges/03-adding-new-tasks/README.md`
- **Challenge 04**: `challenges/04-task-completion-toggle/README.md`
- **Challenge 05**: `challenges/05-task-deletion/README.md`
- **Challenge 06**: `challenges/06-task-filtering/README.md`
- **Challenge 07**: `challenges/07-priority-based-sorting/README.md`
- **Challenge 08**: `challenges/08-task-editing/README.md`
- **Challenge 09**: `challenges/09-search-functionality/README.md`
- **Challenge 10**: `challenges/10-useeffect-local-storage/README.md`
- **Challenge 11**: `challenges/11-useeffect-debounced-search/README.md`
- **Challenge 12**: `challenges/12-categories-and-tags/README.md`
- **Challenge 13**: `challenges/13-due-dates-and-sorting/README.md`
- **Challenge 14**: `challenges/14-task-statistics-dashboard/README.md`
- **Challenge 15**: `challenges/15-component-organization/README.md`
- **Challenge 16**: `challenges/16-context-api-theme/README.md`
- **Challenge 17**: `challenges/17-custom-hook-uselocalstorage/README.md`
- **Challenge 18**: `challenges/18-usereducer-complex-state/README.md`
- **Challenge 19**: `challenges/19-performance-optimization/README.md`
- **Challenge 20**: `challenges/20-error-boundaries/README.md`
- **Challenge 21**: `challenges/21-react-router/README.md` — React Router, Link, useParams, useNavigate
- **Challenge 22**: `challenges/22-data-fetching/README.md` — Data fetching, loading and error state
- **Challenge 23**: `challenges/23-useref-focus-management/README.md` — useRef, focus management

### 4. Verify Your Work

**Visual Verification (Primary Method):**
1. Run `npm run dev`
2. Open the app in your browser
3. Interact with your features
4. Confirm everything works as expected visually

**Then Run Review for Scoring:**
```bash
# Review all challenges
npm run review

# Review specific challenge
npm run review -- --challenge=01-static-task-display
```


## 📊 Progress Evidence

*Auto-updated when you run review. Last run: 2/1/2026, 3:21:10 PM*

| Metric | Value |
|--------|-------|
| Challenges completed | 0 / 23 (0%) |
| Average score | 0% |

| Challenge | Skills covered | Status |
|-----------|----------------|--------|
| Static Task Display | JSX, Functional components, Props, Component composition, Semantic HTML | — |
| Dynamic Task Rendering | useState, map(), key prop, Lists in JSX | — |
| Adding New Tasks | Controlled inputs, Event handlers, Form validation, Form handling, Immutable state | — |
| Task Completion Toggle | Updating array state, Event handlers with params, Conditional styling | — |
| Task Deletion | filter, Immutable state, Confirmation patterns, Prop functions with arguments | — |
| Task Filtering | Derived state, Conditional rendering, Filter logic composition | — |
| Priority-Based Sorting | Array sort, Sort stability, Multiple sort criteria, Select dropdowns | — |
| Task Editing | Inline editing, Conditional rendering, Edit mode state, Controlled inputs, Form handling, State synchronization | — |
| Search Functionality | Text search, Combining filters, String methods, Search UI patterns | — |
| useEffect - Local Storage Persistence | useEffect, Side effects, localStorage, JSON serialization, Effect dependencies | — |
| useEffect - Debounced Search | useEffect cleanup, setTimeout, Debouncing, Memory leak prevention | — |
| Categories and Tags | Complex state, Array fields, Multi-select/tags input, Nested data, Filtering by array membership | — |
| Due Dates and Sorting | Date handling, Date objects and formatting, Date comparison, Overdue detection | — |
| Task Statistics Dashboard | Computed statistics, useMemo, Performance optimization, Data aggregation | — |
| Component Organization with Props | Component extraction, Props interface design, Single Responsibility, Reusability, Props destructuring | — |
| Context API - Theme Management | React Context, createContext, Provider, useContext, Global state, Custom hook | — |
| Custom Hook - useLocalStorage | Custom hooks, Hook composition, Reusable logic, localStorage abstraction | — |
| useReducer - Complex State Management | useReducer, Reducer functions, Action objects, Dispatch pattern, Complex state logic | — |
| Performance Optimization | React.memo, useCallback, useMemo, Re-render optimization | — |
| Error Boundaries and Error Handling | Error boundaries, Class component, Error handling, Fallback UI, try-catch | — |
| React Router - Routing and Navigation | React Router, Route, Link, useNavigate, useParams, URL-driven UI, Dynamic segments | — |
| Data Fetching - Loading and Error State | fetch, useEffect, Loading state, Error state, Async data, Conditional rendering | — |
| useRef - Focus Management | useRef, ref.current, Focus management, DOM access, useEffect with ref | — |

## 📋 Challenge Workflow

1. **Read the challenge** in `challenges/{challenge-id}/README.md` (it has all instructions, including wiring and exports)
2. **Create or update** code in `src/components/` as the README says
3. **Run the app** (`npm run dev`) when it builds; verify visually
4. **Run review** (`npm run review`) to get scored

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests (Playwright)

**Out of the box:** Chromium is installed automatically after `npm install` (postinstall script) so E2E and review work without extra steps. To skip browser download (e.g. in CI with cached browsers), set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` before `npm install`.

**Run E2E tests:**
```bash
npm run test:e2e
```

**If E2E fails with "Executable doesn't exist":** run `npm run setup:e2e` (installs Chromium only). Or from repo root run `npm run setup` to install for all courses.

E2E tests verify visual output and user interactions. When the review runs E2E, it starts the app on port **5174** (CI) to avoid conflict with a dev server on 5173.

### Review System

The review system runs:
- ✅ Unit tests (functional correctness)
- ✅ E2E tests (visual/interaction verification)
- ✅ Code quality checks (ESLint)
- ✅ Architecture validation (AST pattern checks)
- ✅ Best practices review
- ✅ AI code review (readability & maintainability)

## 📁 Project Structure

```
project/
├── src/                    → Your code goes here
│   ├── components/         → React components
│   └── ...
├── challenges/             → Challenge definitions
│   ├── 01-static-task-display/
│   ├── 02-dynamic-task-rendering/
│   ├── 03-adding-new-tasks/
│   └── 04-task-completion-toggle/
├── tests/                  → Test files
│   ├── challenge-*.test.tsx  → Unit tests
│   └── e2e/                → E2E tests (Playwright)
└── package.json
```

## 🎯 Important Notes

- **This is a real app** - you can see your changes immediately
- **Visual verification first** - run the app to confirm features work
- **Then get scored** - run review for comprehensive evaluation
- **Tests verify requirements** - they check technical correctness, not just visual appearance

## 🔍 Review Output

Results are saved to `../results/`:
- `challenge-results.json` - Individual challenge scores
- `course-summary.json` - Overall course summary
- `ai-feedback.json` - AI review feedback
