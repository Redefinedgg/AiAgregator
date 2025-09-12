FROM node:20-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .

RUN pnpm install

FROM base AS dev

WORKDIR /app

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev:docker"]
