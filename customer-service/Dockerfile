FROM node:12

# Create app directory
WORKDIR /usr/bin/customer

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy app source code
COPY . .

# Build step
RUN npm run build

#Expose port and start application
EXPOSE 1500
CMD [ "node", "dist/main.js" ]