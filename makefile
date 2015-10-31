PWD=`pwd`

build_node:
	docker build -t mrw.node .

run_mongodb:
	docker run \
	--name mrw.mongodb \
	-v '$PWD'/data:/data/db \
	-it --rm \
	mongo:latest

run_app:
	docker run \
	-d --rm \
	-p 3500:3500 \
	--name mrw.app \
	--link mrw.mongodb:mongo \
	mrw-node \
	npm start
