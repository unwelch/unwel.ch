docker login -u="$DOCKERHUB_USERNAME" -p="$DOCKERHUB_PASSWORD"
cd ./frontend
docker build -t frontend .
docker tag frontend unwelch/frontend
cd ..
cd ./backend
docker build -t backend .
docker tag backend unwelch/backend
cd ..
docker push unwelch/frontend
docker push unwelch/backend
