# Build stage
FROM node:lts AS build

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ../gitmon-next/package*.json ./
RUN npm install

# Copy all files and build Next.js app
COPY ../gitmon-next ./
RUN npm run build

# Production stage
FROM node:lts AS runtime

WORKDIR /app

# Copy built application from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Expose Next.js default port
EXPOSE 3100

# Start the Next.js server
CMD ["npm", "run", "start"]
