PWD=`pwd`

build_node:
	docker build -t mrw.node .

run_mongodb:
	docker run \
	--name mrw.mongodb \
	-v '$$PWD'/data:/data/db \
	-d \
	mongo:latest

run_mongodb_local:
	docker run \
	--name mrw.mongodb \
	-d \
	-p 27017:27017 \
	mongo

run_app:
	docker run \
	-d \
	-p 80:3500 \
	-v '$$PWD'/server/public/upload:/var/www/server/public/upload \
	--name mrw.app \
	--link mrw.mongodb:mongo \
	mrw.node \
	node --use_strict server/server.js

db_connect:
	docker run \
	-it \
	--link mrw.mongodb:mongo \
	--rm \
	mongo \
	sh -c 'exec mongo "$$MONGO_PORT_27017_TCP_ADDR:$$MONGO_PORT_27017_TCP_PORT/test"'

bash_app:
	docker run \
	-it \
	--rm \
	-v '$$PWD'/server/public/upload:/var/www/server/public/upload \
	-p 80:3500 \
	--name mrw.app \
	--link mrw.mongodb:mongo \
	mrw.node \
	/bin/bash

clean_exited:
	docker ps -a | grep Exited | awk '{print $$1}' | xargs docker rm
