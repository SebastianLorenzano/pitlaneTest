# ---------- Stage 1: Build React ----------
FROM node:22-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


# ---------- Stage 2: Build Spring Boot with Corretto 17 ----------
FROM amazoncorretto:17 AS backend-build

WORKDIR /app

COPY backend/mvnw ./
COPY backend/.mvn ./.mvn
COPY backend/pom.xml ./

RUN chmod +x mvnw

COPY backend/src ./src

# Copy React build into Spring Boot static folder
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

RUN ./mvnw clean package -DskipTests


# ---------- Stage 3: Runtime container ----------
FROM amazoncorretto:17

WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]