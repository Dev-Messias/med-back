# Etapa 1: Construir a aplicação
FROM node:18 AS build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar arquivos de configuração do projeto
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação
COPY ./src ./src

# Compilar TypeScript para JavaScript
RUN npm run build

# Etapa 2: Executar a aplicação
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar arquivos necessários do estágio anterior
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Instalar apenas as dependências de produção
RUN npm install --only=production

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]