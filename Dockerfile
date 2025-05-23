# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the rest of the application
COPY . .

# Build the project
RUN pnpm run build

# Expose a port if needed (not required for MCP over stdio, but in case)
# EXPOSE 3000

# Command to run the MCP server
CMD ["node", "dist/index.js"]
