#!/bin/sh

echo Downloading database...

ssh -C root@ec2-54-153-120-126.us-west-1.compute.amazonaws.com mysqldump -u root neighborme | mysql -u root -D neighborme
