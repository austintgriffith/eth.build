#/bin/bash
sudo certbot certonly --standalone -d rpc.eth.build --config-dir ~/.certbot/config --logs-dir ~/.certbot/logs --work-dir ~/.certbot/work
sudo cp -f ~/.certbot/config/live/rpc.eth.build/privkey.pem server.key;sudo chmod 0777 server.key
sudo cp -f ~/.certbot/config/live/rpc.eth.build/fullchain.pem server.cert;sudo chmod 0777 server.cert
