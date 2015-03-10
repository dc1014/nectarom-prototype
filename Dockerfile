FROM    ubuntu:latest

#Get Curl
RUN sudo apt-get install -y curl
COPY . /src
# Get Setup for Node.js
RUN     curl -sL https://deb.nodesource.com/setup | sudo bash -
# Install Node.js and npm
RUN     sudo apt-get install -y nodejs

# Bundle app source
COPY . /src
# Install app dependencies
RUN cd /src; npm install

EXPOSE  8080
CMD ["node", "/src/app.js"]