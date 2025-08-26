# Stage 1: Build
FROM node:18-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl
RUN apt-get install -y curl unzip
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install --force
RUN npm cache clean --force
RUN npx prisma generate
RUN npm run build

# RUN curl -sSL https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip -o sonar-scanner.zip \
#     && unzip sonar-scanner.zip \
#     && mv sonar-scanner-5.0.1.3006-linux /opt/sonar-scanner \
#     && rm sonar-scanner.zip

# ARG SONAR_TOKEN
# RUN /opt/sonar-scanner/bin/sonar-scanner \
#     -Dsonar.projectKey=jkasfdnjdfkasjdflkafasdfasdfasdfadfmlr3413423 \
#     -Dsonar.host.url=http://sonarqube:9000 \
#     -Dsonar.token=${SONAR_TOKEN}

# Stage 2: Production
FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "start"]
