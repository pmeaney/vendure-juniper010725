# Notes for prod


We may need a volume for 'assets' dir for vendure-server container.  That may look something like this:


```
docker run -d \
  --name vendure-server \
  -v /opt/vendure/assets:/usr/src/app/static/assets \
  -e DB_HOST=${{ secrets.DB_HOST }} \
  your-registry/vendure-server:prod
```