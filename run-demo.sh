if [ $# -gt 0 ]; then
    grunt --gruntfile portal/Gruntfile.js
fi
docker-compose up -d --force-recreate
proxy/update-proxy.sh microsvcdemo_proxy_1
docker run -v proxy_config:/proxy busybox cat /proxy/default.conf
docker-compose up --no-recreate
