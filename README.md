# Vendure Project - Monorepo 

This project will be an initial draft of an Vendure ecommerce project. It's dockerized for easy CICD deployment.  It has Docker-compose files for easy local development spin-up.

DB Info:
POSTGRES_DB: vendure_db
POSTGRES_USER: vendure_db_user
POSTGRES_PASSWORD: vendure_db_pass

---

Current to do:

- Jan 08, 2026 - 02:30 pm

- With docker compose, local dev env: Things build. things run. However, the dashboard shows "run <some command> to build dashboard"
  - Need to figure that out...
  - Might need to add vite dev server's default ports (5173:5173) to v-srv-juniper010725's ports in docker compose file
  - ...and/or need to ensure that some sort of npm or npx build step is happening correctly in server & worker Dockerfiles 

- Jan 07, 2026 - 03:48 pm
  - Finish setting up docker-compose.local.yml:
    - & its dependencies (e.g. 3 dockerfiles- Server, worker, storefront)
    - create example env file if not already existing & make sure .gitignore does not ignore them
  - Test it locally


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