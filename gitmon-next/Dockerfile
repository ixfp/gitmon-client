# Build stage
FROM node:lts AS build

# Create app directory
WORKDIR /app

# Copy package.json from ../gitmon-next
COPY ../gitmon-next/package*.json ./
RUN npm install

# Copy all files from ../gitmon-next
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

# Expose Next.js to port 3100
EXPOSE 3100

# Start the Next.js server on port 3100
CMD ["npm", "run", "start", "--", "-p", "3100"]
