ARG NODE_VERSION=18-alpine

#################
## DEVELOPMENT ##
#################
FROM node:${NODE_VERSION} AS development

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

################
## PRODUCTION ##
################
FROM node:${NODE_VERSION} AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=development /app/ .

EXPOSE ${PORT}

CMD [ "node", "build/index" ]
