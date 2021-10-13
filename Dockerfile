# Source node image
FROM node

# Create app directory
WORKDIR /usr/src/app

# Initialize environment variables
ENV TOKEN=token
ENV CLIENT_ID=client
ENV GUILD_ID=guild

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Start program
CMD ["npm", "run", "start"]
