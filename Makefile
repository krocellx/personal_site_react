.PHONY: test-api test-ui check-ui check

test-api:
	cd api && pipenv run pytest

test-ui:
	cd frontend && npm test -- --watchAll=false

check-ui:
	cd frontend && npm run lint && npm run build

check: test-api check-ui

