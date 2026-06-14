# Automation Test Framework

UI + API test automation for two public sandbox applications in a single project:

- **UI** - [automationintesting.online](http://automationintesting.online/) (B&B booking site)
- **API** - [restful-booker.herokuapp.com](https://restful-booker.herokuapp.com/) (CRUD booking REST API)

Built with **Playwright + TypeScript**.

## Setup

## Workflow

Run tests and code quality checks using npm scripts:

| Command                   | Purpose                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `npm test`                | Run all tests (API + UI across all browsers)                                                           |
| `npm run test:smoke`      | Only tests tagged `@smoke` (quick validation)                                                          |
| `npm run test:regression` | Only tests tagged `@regression` (full suite)                                                           |
| `npm run test:ui`         | UI tests only, Chromium browser                                                                        |
| `npm run test:api`        | API tests only                                                                                         |
| `npm run test:headed`     | Tests with visible browser                                                                             |
| `npm run test:debug`      | Launch Playwright Inspector; step through tests line-by-line                                           |
| `npm run lint`            | Check code style                                                                                       |
| `npm run lint:fix`        | Auto-fix ESLint violations (imports, spacing, etc.)                                                    |
| `npm run format`          | Auto-format code                                                                                       |
| `npm run typecheck`       | Validate TypeScript types                                                                              |
| `npm run report`          | Open last test report                                                                                  |
| `npm run codegen`         | Launch Playwright's code recorder; useful for capturing accurate selectors before writing page objects |

**Common workflows:**

- Local dev: `npm run test:headed` or `npm run test:debug`
- Pre-commit: `npm run lint:fix && npm run format && npm run typecheck`
- CI: `npm run lint && npm run typecheck && npm run test:smoke`
- Selector discover: `npm run codegen` then steal the selectors into your page objects
