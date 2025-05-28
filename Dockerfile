# Etapa 1: Build
FROM node:20 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# Gera o cliente Prisma para o build funcionar
RUN npx prisma generate

# Compila o app NestJS
RUN yarn build

# Etapa 2: Execução
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma


# Executa migrations ao subir
RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["node", "dist/main"]