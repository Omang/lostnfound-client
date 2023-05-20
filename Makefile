build-dev:
	docker build -t lostnfoundclient .


build-local:
	docker build \
	 -t lostnfoundclient-production:local \
     --build-arg CADDYFILE=Caddyfile.local \
     --build-arg BASE_URL=http://localhost:5000/api \
	 -f Dockerfile.production .
	

build-production:
	docker build \
	-t lostnfoundclient-production:production \
    --build-arg CADDYFILE=Caddyfile.production \
    --build-arg BASE_URL=https://lostnfound.co.bw/api \
	-f Dockerfile.production .
