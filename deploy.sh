docker login -u="$DOCKERHUB_USERNAME" -p="$DOCKERHUB_PASSWORD"
docker build -t frontend ./frontend
docker tag frontend unwelch/frontend
docker build -t backend ./backend
docker tag backend unwelch/backend
docker push unwelch/frontend
docker push unwelch/backend
