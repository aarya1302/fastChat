
# Stage 1: Build the React frontend
FROM node:14 as builder
WORKDIR /app
COPY ./chat-app/package*.json ./chat-app/
RUN cd chat-app && npm install
COPY ./chat-app/ ./chat-app/
RUN cd chat-app && npm run build

# Stage 2: Build the backend and copy the frontend build files
FROM node:14
ARG MONGO_URI
ARG SESSION_SECRET
ENV MONGO_URI=${MONGO_URI}
ENV SESSION_SECRET=${SESSION_SECRET}}
WORKDIR /app
COPY --from=builder /app/chat-app/build ./public
COPY ./package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
