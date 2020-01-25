#/bin/bash
sudo certbot certonly --config-dir ~/.certbot/config --logs-dir ~/.certbot/logs --work-dir ~/.certbot/work
#sudo cp -f ~/.certbot/config/live/solc.eth.build/privkey.pem server.key;sudo chmod 0777 server.key
#sudo cp -f ~/.certbot/config/live/solc.eth.build/cert.pem server.cert;sudo chmod 0777 server.cert


#sudo su
# cd /home/ec2-user/.certbot/config/live/rpc.eth.build
# cp -f privkey.pem /home/ec2-user/eth.build/proxy/rpc/server.key
# cp -f cert.pem /home/ec2-user/eth.build/proxy/rpc/server.cert
