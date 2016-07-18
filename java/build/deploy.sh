#!/bin/sh

echo Building jar.
/usr/local/Cellar/ant/1.9.6/libexec/bin/ant

echo Uploading jar...
scp server.jar root@ec2-54-153-120-126.us-west-1.compute.amazonaws.com:~/neighborme.jar

echo Restarting server
ssh root@ec2-54-153-120-126.us-west-1.compute.amazonaws.com 'screen -S neighborme -X quit;screen -S neighborme -d -m java -jar neighborme.jar'

echo Done!
