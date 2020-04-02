# Getting Started With Ottoman

Currently there is no support for Couchbase Node JS SDK 3, For this reason, we will be installing `couchbase@^2.6`. 

First we will need Couchbase Server running, with a bucket named `task-management`. The best way to work with Couchbase Server or any database from a developer environment is to use Docker.

## Build and Run Couchbase Server with Named Bucket

If you have docker installed, we can run the following from the command line:

```
docker pull couchbase
```

```
git clone https://github.com/httpJunkie/couchbase-server-lt && cd couchbase-server-lt
```

### *Mac Only-

Enable permissions on directory:

```
chmod +x configure.sh
```

Build our image:

```
docker build -t couchbase-server-lt .
```

Run our Docker containter:

```
docker run -d -p 8091-8094:8091-8094 -p 11210:11210 -e CB_ADMIN_USER=Administrator -e CB_ADMIN_PASS=password -e CB_BUCKET=task-management -e CB_BUCKET_PASS= --name cbs1 couchbase-server-lt
```

## Create Docuemnts and Retrieve in Node with Ottoman

Now that we have our database up and running, we just need to create a Node application that with the assistance of Ottoman, we can setup a model for our documents of type "todo" and add them to the bucket and turn around and retrieve a single document.

### Creating the Node JS App

Create the directory and initialize npm and install couchbase and ottoman and, setup config file and open `server.js` the file we will be using to create our Node application.

```
mkdir task-manager && cd $_ && npm init -y && npm install couchbase ottoman dotenv && touch .env && echo -e "user=Administrator \npass=123456 \n" >> .env && touch .server.js && code .
```

### Connecting to Couchbase Bucket

The first thing we need to do is import our packages and create aconnection to our Couchbase Server running in Docker.


```require('dotenv').config()
const { cbUser, cbPass } = process.env

var ottoman = require('ottoman');
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster('couchbase://localhost')
cluster.authenticate(user, pass)
ottoman.bucket = cluster.openBucket('task-management')
```

Now we can get started creating the model that will be our todo document that will get auto created and stored in our designated `task-management` Couchbase bucket.

```
xxx
```