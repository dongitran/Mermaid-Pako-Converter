FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production
COPY . .

RUN adduser -D nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

CMD ["npm", "start"]