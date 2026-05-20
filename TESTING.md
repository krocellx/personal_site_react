# Testing Setup

This repo has two test surfaces:

- `api`: Python unit and API tests.
- `frontend`: React component tests, linting, and production build checks.

The goal is not full coverage. The goal is a small, fast safety net that catches
common regressions before accepting LLM-generated code.

## One-time Setup

Backend:

```bash
cd api
pip install pipenv
pipenv install --dev
```

Frontend:

```bash
cd frontend
npm ci
```

## Daily Commands

Run backend tests:

```bash
make test-api
```

Run frontend tests:

```bash
make test-ui
```

Run the frontend lint and production build:

```bash
make check-ui
```

Run the main guardrail before accepting a generated change:

```bash
make check
```

## What To Test First

Backend unit tests should cover pure logic before Flask routes:

- Data shape validation.
- Portfolio return calculations.
- Financial data transformations.
- Error handling for empty or malformed upstream API responses.

Flask route tests should mock external services:

- Mock Financial Modeling Prep and Unsplash HTTP calls.
- Mock MongoDB collection behavior.
- Assert status codes and response JSON shapes.

Frontend tests should mock the API client:

- Loading state.
- Successful response state.
- Error toast or fallback state.
- Empty data state.

## LLM Coding Workflow

Use this loop for maintainable solo development:

1. Ask the LLM for a small change.
2. Ask for or write tests that describe the intended behavior.
3. Run `make check`.
4. Review the diff for unrelated edits.
5. Commit only after the tests and diff are both clean.

For bugs, write or request a failing test first. Then let the implementation
change make that test pass.

