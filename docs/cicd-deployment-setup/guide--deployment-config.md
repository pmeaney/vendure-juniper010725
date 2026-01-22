# Guide to Configuring: Vendure.io Containerized CICD Deployment via Github Actions

This project's CICD deployment uses the following secrets.
They must be setup in the repo's secrets.


Set up the following **repository secrets** in the repo.  Be sure that the ones labeled _ENV_FILE use the production, super secret env vars-- not the ones from the default or example env var files.
(example env var files: for local dev on developer's MacOS laptop; default env var files: during CICD these are parsed and set into the project's app container images when they're built and published. Then in a later CICD step, when the containers are built from the images and run-- when they're run, the containers are injected with the secret production env var files)
   - `LINUX_BOTCICDGHA_USERNAME`: Username for SSH access
   - `LINUX_SERVER_IPADDRESS`: IP address of deployment server
   - `POSTGRES__SECRET_ENV_FILE`: environment variables for Database
   - `STOREFRONT__SECRET_ENV_FILE`: environment variables for storefront
   - `SRV_WRK__SECRET_ENV_FILE`: environment variables for vendure server & worker (one file, used for both)
   - `GHPATCICD_RPOWKFLO_WRDPCKGS`: GitHub Personal Access Token with repository, workflow, and package read/write permissions
   - `LINUX_SSH_PRIVATE_KEY_CICD`: SSH key for deployment server access.  See below for steps to set this up.

## Setup of LINUX_SSH_PRIVATE_KEY_CICD

1. Generate the SSH key on your dev laptop (not on the server): `ssh-keygen -t ed25519 -C "gha-cicdbot-01076" -f ~/.ssh/ed25519_for_gha_cicdbot_010726`
   Note: the `-C` means "comment". It's a descriptive comment which appears at the end of the public key to help you remember what the key is for.  Using `010726` because it's the date associated with this project: Jan 07, 2026.

