![API Tests](https://github.com/OmonUrkinbaev/api-playwright-qa/actions/workflows/tests.yml/badge.svg)

# API QA Automation (Playwright)

Playwright-based REST API test automation project focused on authentication, protected endpoints, data-driven coverage, and negative testing.

## What’s covered
- Auth testing (positive/negative): `/auth/login`
- Token-based authorization testing: `/auth/me` with `Bearer` token
- Products API validation (data-driven tests + basic schema checks)
- Robust assertions for status codes, JSON content type, and response shape

## Tech stack
- Playwright (@playwright/test)
- TypeScript
- GitHub Actions CI (runs on every push/PR)

## Run locally
```bash
npm ci
npm test

Report
npm run report


Коммит/пуш:
```bash
git add README.md
git commit -m "Improve README for QA automation"
git push