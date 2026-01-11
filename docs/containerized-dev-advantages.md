# Advantages of Fully Containerized Development


[Question]: What would you say would be any advantages of running your server code from inside docker locally?

[Response]:
From:
Patrick Meaney / Discord: BioByte01
patrick.wm.meaney@gmail.com
https://github.com/pmeaney/

Great question!

## 1. Production ↔ Dev Environment Parity

### A. Same Everything
Both environments run in the same OS (the container's Linux OS), use the same Node.js version, the same DB version—same everything.

### B. Catch Production Issues Early
This helps catch production issues early. For example, I hit a lightningcss binary mismatch: npm on my Mac installed `lightningcss-darwin-arm64`, but the Linux container needed `lightningcss-linux-arm64-gnu`.

**Solution:** Install dependencies inside the container on first startup via a conditional in the Dockerfile (see [line 19](https://github.com/pmeaney/vendure-juniper010725/blob/main/my-shop-juniper/apps/storefront/Dockerfile.storefront#L19))

### C. Real-World Example: CDK Global
At CDK Global, our 15-year-old Ruby application had a major onboarding problem: new developers needed to install multiple dependencies in specific ways, and the documentation constantly lagged behind dependency updates.

There was no simple turn-key command for new developers to start the app and begin working.

By containerizing, the entire application—serverside, clientside, database, and OS—runs with one command:

```bash
docker compose up
```

Compare this to CDK's process: "Go to Confluence, follow 10+ steps, update the docs if needed, let us know if you get it working." Errors during install and startup were inevitable, creating unnecessary obstacles for new developers. This is why leadership invested 3 months to dockerize our $25 million product.

## 2. Testing Environment Parity
The same goes for Testing Environments—exact parity with Dev & Prod. It's easy to quickly deploy the app to a Testing server, supply it with test data, run the app, and run tests against the mock (test) data.

## 3. Clean Isolation
No global npm packages, no conflicts with other projects' npm/node versions, no juggling version managers on the developer's laptop.

## 4. Reproducibility
The Dockerfile documents exactly what the application needs to run. The docker-compose.yml documents the entire ecosystem setup. Both are version-controlled, making it easy to see requirements for both Dev and Prod environments, and ensuring anyone can replicate the setup exactly.
