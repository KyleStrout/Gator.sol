FROM node:16
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm ci

RUN npm install -g concurrently

CMD ["concurrently","npm:start", "npm:server", "npm:blockchain"]