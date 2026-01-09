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


