FROM    ubuntu:latest

#Add keys and list for Mongo
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list

#update package manager 
RUN apt-get update 

#install mongo
RUN apt-get install -y mongodb-org=2.6.1 mongodb-org-server=2.6.1 mongodb-org-shell=2.6.1 mongodb-org-mongos=2.6.1 mongodb-org-tools=2.6.1

#Create directory for mongo data
RUN mkdir -p /data/db

#Expose db port to host 
EXPOSE 27017

#set entry point to launch mongod on container
ENTRYPOINT usr/bin/mongod

#Get Curl
RUN sudo apt-get install -y curl
COPY . /src

# Get Setup for Node.js
RUN     curl -sL https://deb.nodesource.com/setup | sudo bash -

# Install Node.js and npm
RUN apt-get install -y nodejs git git-core

#add startup script to container
#ADD start.sh /tmp/

#make startup script executable
#RUN chmod +x /tmp/start.sh

#CMD ./tmp/start.sh

# Bundle app source
#COPY . /src

RUN cd /src; npm install

EXPOSE  8080
CMD ["node", "/src/app.js"]