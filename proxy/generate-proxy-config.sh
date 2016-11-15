#!/bin/bash
containers=$(docker ps -q --filter "label=com.factor10.splat.proxy")
subsystems=""
for container in $containers; do
  config=$(docker inspect $container 2> /dev/null)
  subsystem=$(echo $config | jq -r '.[0].Config.Labels["com.factor10.splat.proxy"]')
  subsystems+="${subsystem}
"
done
upstream=""
location=""
subsystems=$(echo "$subsystems" | sort | uniq)
for subsystem in $subsystems; do
  containers=$(docker ps -q --filter "label=com.factor10.splat.proxy=$subsystem")
  pool=""
  for container in $containers; do
  	config=$(docker inspect $container 2> /dev/null)
  	ipaddress=$(echo $config | jq -r .[0].NetworkSettings.IPAddress)
    port=$(echo $config | jq -r '.[0].Config.Labels["com.factor10.splat.proxy_port"]')
  	containername=$(echo $config | jq -r '.[0].Name')
    pool+="    server $ipaddress:$port; # container ${containername#/} ($container)
"
  done
  upstream+="upstream $subsystem.pool {
$pool}

  "
  location+="
  location /$subsystem/ {
    proxy_pass http://$subsystem.pool/;
  }
"
done

echo "$upstream# our proxy fronting all subsystems
server {
  gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

  server_name splat.dev;
  proxy_buffering off;
  error_log /proc/self/fd/2;
  access_log /proc/self/fd/1;

  proxy_set_header Host \$http_host;
  proxy_set_header X-Real-IP \$remote_addr;
  proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto \$scheme;
  # workaround VirtualBox sendfile bug
  sendfile off;

  root /www/data;

  location / {
    autoindex on;
  }

  # HTTP 1.1 support
  proxy_http_version 1.1;
  proxy_set_header Connection \"\";
  $location}"
