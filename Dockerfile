# FROM node:12
# WORKDIR /app
# COPY package*.json ./
# RUN npm install 
# COPY . . 
# ENV PORT=8080
# ENV SESSION_SECRET=somethingsecret
# ENV MONGO_URI=mongodb://localhost:27017/fast-chat
# EXPOSE 8080
# CMD [ "npm", "start" ]

# Stage 1: Build the React frontend
FROM node:14 as builder
WORKDIR /app
COPY ./chat-app/package*.json ./chat-app/
RUN cd chat-app && npm install
COPY ./chat-app/ ./chat-app/
RUN cd chat-app && npm run build

# Stage 2: Build the backend and copy the frontend build files
FROM node:14
WORKDIR /app
COPY --from=builder /app/chat-app/build ./public
COPY ./package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
