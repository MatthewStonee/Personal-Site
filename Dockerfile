FROM node:24-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json'
COPY package*.json ./

# install the exact dependency versions from the lockfile
RUN npm ci

# build-time API keys; RUN steps see them as environment variables, and Vite inlines them into the bundle
ARG VUE_APP_OPENWEATHER_KEY
ARG VUE_APP_RAPIDAPI_KEY

# copy project files and folders to the current working directory (i.e. 'app' folder);
# .dockerignore keeps .env, .git and node_modules out of the image
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist", "--proxy", "http://localhost:8080?" ]
