# ---------- Stage 1: Build React ----------
FROM node:22-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


# ---------- Stage 2: Build Spring Boot ----------
FROM maven:3.9.9-amazoncorretto-17 AS backend-build

WORKDIR /app

COPY backend/pom.xml ./
COPY backend/src ./src

# Copy React build into Spring Boot static folder
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

RUN mvn clean package -DskipTests


# ---------- Stage 3: Runtime ----------
FROM amazoncorretto:17

WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]