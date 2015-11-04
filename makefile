PWD=`pwd`

build_node:
	docker build --no-cache -t mrw.node .

run_mongodb:
	docker run \
	--name mrw.mongodb \
	-v '$PWD'/data:/data/db \
	-d \
	mongo:latest

run_app:
	docker run \
	-d \
	-p 80:3500 \
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
	sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'

bash_app:
	docker run \
	-it \
	--rm \
	-p 80:3500 \
	--name mrw.app \
	--link mrw.mongodb:mongo \
	mrw.node \
	/bin/bash
