# 🧠 BaniyaMart Backend – Spring Boot API

This is the **backend** service for BaniyaMart – a full-stack grocery store web application built to help local businesses sell products online.

---

## 🚀 Tech Stack

| Layer       | Technology          |
| ----------- | ------------------- |
| Language    | Java 17             |
| Framework   | Spring Boot         |
| Build Tool  | Maven               |
| Database    | MongoDB Atlas       |
| REST        | Spring Web          |
| Data Access | Spring Data MongoDB |

---

## 📦 Features

- Product Catalog API (CRUD)
- Connects to MongoDB Atlas
- Ready for Order & Cart modules
- Clean structure with separation of concerns

---

## 🔧 Setup Instructions

### 1. 📁 Open `backend/` directory

```bash
cd backend
```

### 2. Configure MongoDB

Edit the file src/main/resources/application.properties and add:

```bash
spring.data.mongodb.uri=mongodb+srv://<user>:<password>@<cluster-url>/baniyamart?retryWrites=true&w=majority
spring.data.mongodb.database=baniyamart
```

Replace <user>, <password>, and <cluster-url> with your actual MongoDB Atlas credentials.

### 3. ▶️ Run the App

If using Maven wrapper (recommended):

```bash
mvnw.cmd spring-boot:run
```

or

```bash
mvn spring-boot:run

```

Or via your IDE (IntelliJ/VS Code):
Run BackendApplication.java as a Spring Boot app.
