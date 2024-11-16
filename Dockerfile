FROM  node:22-slim
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install
EXPOSE 5173
COPY . .