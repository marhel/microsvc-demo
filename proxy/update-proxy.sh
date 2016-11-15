DIR=`dirname $0`
$DIR/generate-proxy-config.sh | docker run -i -a stdin -v proxy_config:/proxy busybox sh -c "cat > /proxy/default.conf"
docker kill --signal=HUP $1
