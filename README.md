# Vendure Project - Monorepo 

This project will be an initial draft of an Vendure ecommerce project. It's dockerized for easy CICD deployment.  It has Docker-compose files for easy local development spin-up.

Run it locally:

- Clone project.
- run `docker compose -f docker-compose.local.yml up`

To clean up:
- break out with control-c
- `docker compose -f docker-compose.local.yml down -v`
  
---

To Do:
  - Deploy it via CICD
  - Start customizing the storefront a bit
  - Create a custom schema for database
  - Create a two-language schema (english, spanish)



# Docker commands during project creation

This won't delete named volumes. It deletes unused volumes (and only if the containers are not running): `docker system prune -a --volumes`

Adding -v to docker compose down removes volumes defined in the compose file (that includes named volumes)
`docker compose -f docker-compose.local.yml down -v`


`docker volume prune -a --force`
Deletes:
✅ All volumes not attached to ANY container (running or stopped)
✅ Both anonymous AND named volumes

Keeps:

❌ Volumes attached to running containers
❌ Volumes attached to stopped containers (unless you remove containers first)