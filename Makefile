env:
	@bash setup/env.sh

database:
	docker compose -f docker-compose.yml up -d redis

up:
	docker compose -f docker-compose.yml up

down:
	docker compose -f docker-compose.yml down

prune:
	docker system prune -af --volumes --force
