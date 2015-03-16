# README #

So you want to run this app? 

1. Install docker on your native OS
2. git clone https://dc1014@bitbucket.org/dc1014/nectarom-prototype.git
3. cd nectarom-prototype
4. docker build -t <username>/nectarom-prototype . #don't forget the period
5. docker run -d -p 49160:8080 <username>nectarom-prototype 
6. curl -i 127.0.0.1:49160 #you should get empty array 

Then just use the API found in app/routes/authorRoutes.js with POSTMAN.

**STACK**
Node 
Hapi 
Backbone 
Mongo

*Considering JWT for auth*

**SYSTEM**
Docker - FROM ubuntu:latest

**TOOLS**
NPM 
GULP
SASS