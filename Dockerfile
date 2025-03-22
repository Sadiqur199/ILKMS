FROM node:18.14.1-alpine3.17
WORKDIR /core
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]
