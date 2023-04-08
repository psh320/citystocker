docker-clean-images:
	docker rmi $$(docker images -q)

docker-clean-containers:
	docker rm $$(docker ps -a -q)