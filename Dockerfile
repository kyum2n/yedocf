# 1단계: Build 단계
FROM node:18 AS builder

WORKDIR /app

# package.json과 package-lock.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 나머지 소스 코드 복사
COPY . .

# React 앱 빌드
RUN npm run build

# 2단계: Nginx로 배포
FROM nginx:alpine

# React 빌드 결과물을 Nginx가 서비스할 디렉토리로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 포트 오픈
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
