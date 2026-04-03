# Simple Makefile for clientDB project

PROJECT_NAME ?= clientdb

.PHONY: help up down restart build logs backend-logs frontend-logs db-logs \
        sh-backend sh-frontend sh-db test-backend test-frontend prune

help:
	@echo "Commands:"
	@echo "  make up             - Build and start all services (frontend, backend, db)"
	@echo "  make down           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo "  make build          - Build all images"
	@echo "  make logs           - Tail all service logs"
	@echo "  make backend-logs   - Tail backend logs"
	@echo "  make frontend-logs  - Tail frontend logs"
	@echo "  make db-logs        - Tail db logs"
	@echo "  make sh-backend     - Shell into backend container"
	@echo "  make sh-frontend    - Shell into frontend container"
	@echo "  make sh-db          - Shell into db container (psql client if installed)"
	@echo "  make test-backend   - Run backend tests (pytest)"
	@echo "  make test-frontend  - Run frontend tests (npm test)"
	@echo "  make prune          - Stop and remove containers + dangling images"

up:
	docker compose up --build

down:
	docker compose down

restart:
	docker compose down
	docker compose up --build

build:
	docker compose build

logs:
	docker compose logs -f

backend-logs:
	docker compose logs -f backend

frontend-logs:
	docker compose logs -f frontend

db-logs:
	docker compose logs -f db

sh-backend:
	docker compose exec backend bash

sh-frontend:
	docker compose exec frontend sh

sh-db:
	docker compose exec db sh

test-backend:
	docker compose exec backend pytest || true

test-frontend:
	docker compose exec frontend npm test || true

prune:
	docker compose down -v
	docker system prune -f