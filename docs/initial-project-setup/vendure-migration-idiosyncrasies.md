# Vendure Migration Idiosyncrasies

- [Vendure Migration docs](https://docs.vendure.io/guides/developer-guide/migrations/)
- [Vendure CLI docs](https://docs.vendure.io/guides/developer-guide/cli/)

## Initial Setup Issue

When first running `npx vendure migrate`, it failed with a dependency error.

**Root cause:** This project uses `generate-lockfiles.sh` to create Linux-compatible `package-lock.json` files inside Docker containers. While this script **does** create `node_modules` on the host machine (via bind mount), the dependencies are generated for Linux, not macOS.

**Fix:** Ran `npm install` on the host to regenerate dependencies for macOS:
```bash
cd my-shop-juniper/apps/server
npm install
npx vendure migrate
```

## Potential Side Effects

Running `npm install` on macOS **overwrites** the Linux-generated `node_modules` with macOS-compatible versions. This affects:
- **Pure JavaScript packages:** Identical across platforms (no issue)
- **Native modules** (packages with C++ bindings): Different binaries for Linux vs macOS

**Theory:** This should be fine because:
1. `package-lock.json` remains the source of truth for versions
2. Production CICD builds in clean Linux containers using `npm ci`
3. Local `node_modules` is never used in production builds
4. Most Vendure dependencies are pure JavaScript

**Status:** Untested. Will verify when next production deployment runs. If issues arise, can regenerate Linux `node_modules` by re-running `generate-lockfiles.sh`.

**Worst case recovery:** Delete local `node_modules` and re-run `generate-lockfiles.sh`.

## Notes on migration

Initial migration steps:

- Start DB container from root directory: `docker compose -f docker-compose.local.yml up -d v-db-juniper010726`
- Create the migration directory (it didnt exist when project was initially scaffolded) and make sure it matches what you select during the next step of migration setup.
- run `npx vendure migrate`

Here's what I entered:

```bash
❯ npx vendure migrate


┌  🛠️️ Vendure migrations
│
◇  What would you like to do?
│  Generate a new migration
│
◇  Project analyzed
│
●  Using VendureConfig from vendure-config.ts
│
◇  Enter a meaningful name for the migration
│  InitialMigration
│
◇  Migration file location
│  /Users/fuegofox/localhost/projects/active/business-apps/vendure-proje
cts/vendure-juniper010726/my-shop-juniper/apps/server/src/migrations
```

I initially was using this value in the local env var file (`.env.local.example.srv-wrk`):
`DB_HOST=vendure-database`

However, that's the Docker network alias. It only works inside Docker containers, such as in the remote prod container. And it would work for local migrations IF I ran all the containers (since the vendure container can reach the db via container network alias).  However for simplicity I am trying to run the migration process without all the containers running (only the DB container running, locally, for migration).

So, I changed `DB_HOST=vendure-database` to `DB_HOST=localhost`