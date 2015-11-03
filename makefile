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
