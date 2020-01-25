#/bin/bash
sudo certbot certonly --config-dir ~/.certbot/config --logs-dir ~/.certbot/logs --work-dir ~/.certbot/work
#sudo cp -f ~/.certbot/config/live/solc.eth.build/privkey.pem server.key;sudo chmod 0777 server.key
#sudo cp -f ~/.certbot/config/live/solc.eth.build/cert.pem server.cert;sudo chmod 0777 server.cert
