.PHONY: build lookup shell

build:
	docker build -t ipstack/lookup .

lookup:
	@docker run \
		-e IPSTACK_API_KEY=${IPSTACK_API_KEY} \
		-e LOOKUP_IP=${LOOKUP_IP} \
		ipstack/lookup

shell:
	docker run \
		-it \
		-e IPSTACK_API_KEY=${IPSTACK_API_KEY} \
		-e LOOKUP_IP=${LOOKUP_IP} \
		--entrypoint /bin/sh \
		ipstack/lookup

# vim:ft=make
#