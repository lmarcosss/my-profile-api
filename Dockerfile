FROM node:20 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Etapa final com Alpine
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia só o necessário
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

# Reinstala dependências de produção no ambiente Alpine
RUN yarn install --frozen-lockfile --production

EXPOSE 3000

CMD ["yarn", "start:prod"]