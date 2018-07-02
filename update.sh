#!/usr/bin/env bash
echo "Updating server"
pm2 reload ListenWithMe
pm2 reload SongWorker

echo "Updating client"
cp -r client/* /var/www/listenwithme/

echo "Clear cache client"
curl -X DELETE -H "X-Auth-Email: rexviet@gmail.com" -H "X-Auth-Key: 7c4763ac9c1bf24ed463be0cc6c82f8e97fb9" -H "Content-Type: application/json" -d '{"purge_everything": true}' "https://api.cloudflare.com/client/v4/zones/67800206f5f4c0a63d79b6353883c257/purge_cache"

echo "Done."
