cd /tmp

#remove repo if it exists
rm -rf https://dc1014@bitbucket.org/dc1014/nectarom-prototype.git; true

git clone https://dc1014@bitbucket.org/dc1014/nectarom-prototype.git

cd nectarom-prototype/

npm install

node app.js

.