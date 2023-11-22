FROM node:21.2-alpine3.17
WORKDIR /usr/app
COPY package.json .
COPY tsconfig.json .
RUN npm install --quiet
COPY . .
RUN npm run build
ENTRYPOINT npm run lookup ${LOOKUP_IP}
