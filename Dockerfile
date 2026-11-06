FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY --chown=node:node backend ./backend
COPY --chown=node:node frontend ./frontend
USER node
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
CMD ["node", "backend/server.js"]
