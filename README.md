## Accessra-API

**Accessra** is a schema-based, multi-tenant authentication and authorization API built using **NestJS**, **TypeORM**, and **PostgreSQL**. Designed for SaaS platforms, it ensures strict tenant isolation and scalable user management using modern cloud-native tooling.

---

## 🚀 Features

- 🏢 **Schema-based Multi-Tenancy**  
  Each tenant gets its own isolated PostgreSQL schema, enabling secure and scalable SaaS environments.

- 🔐 **Authentication & Authorization**  
  JWT-based authentication and role-based access control (RBAC).

- ⚙️ **Modular NestJS Architecture**  
  Cleanly separated modules for extensibility and testability.

- 🗃️ **TypeORM for ORM**  
  Dynamic tenant-aware data source creation and schema handling.

- 🐳 **Docker Support**  
  Dockerfile and Docker Compose provided for local development and deployment.

- ☁️ **AWS ECS Deployment**  
  Production-ready container deployment on AWS ECS Fargate or EC2.

- ✅ **CI/CD via GitHub Actions**  
  Automated testing and deployment workflows using GitHub Actions.

---

## 🧱 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Cloud**: AWS ECS (Fargate or EC2)
- **CI/CD**: GitHub Actions

---

## 🏗️ Multi-Tenancy Architecture

Accessra follows a **schema-based multi-tenant** architecture:

- Each tenant's data is stored in a **separate PostgreSQL schema**, ensuring complete isolation.
- A **central database schema** manages tenant metadata, authentication credentials, and user assignments.
- Dynamic schema creation and connection logic are handled at runtime using custom TypeORM strategies.

This approach provides:
- ✅ Strong data isolation
- 📈 Easy scaling with minimal changes
- 🔄 Centralized user and tenant management

---

![image](https://github.com/user-attachments/assets/2cf37a28-6d16-4a19-b8aa-330cf239f99c)

