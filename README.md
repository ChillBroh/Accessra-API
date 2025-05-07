# Accessra-API

Accessra is a schema-based, multi-tenant authentication and authorization API built using **NestJS**, **TypeORM**, and **PostgreSQL**. It is designed to power secure, scalable, and isolated multi-tenant SaaS platforms.

---

## 🚀 Features

- 🏢 **Schema-based Multi-Tenancy**  
  Each tenant has its own PostgreSQL schema, ensuring complete data isolation.

- 🔐 **Authentication & Authorization**  
  Role-based access control (RBAC) for fine-grained permission management.

- ⚙️ **Modular NestJS Architecture**  
  Built with NestJS to support highly maintainable and scalable APIs.

- 🗃️ **Database ORM with TypeORM**  
  Clean and efficient database interactions using TypeORM.

- 🐳 **Docker Support**  
  Comes with `Dockerfile` and `docker-compose.yml` for local development and testing.

- ☁️ **AWS ECS Deployment**  
  Easily deployable on AWS ECS with containerized services.

- ✅ **CI/CD Ready**  
  GitHub Actions workflows available for automated testing and deployment.

---

## 🧱 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database ORM**: [TypeORM](https://typeorm.io/)
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Cloud Platform**: AWS ECS Fargate
- **CI/CD**: GitHub Actions

---

## 📁 Project Structure

Accessra-API/
├── .github/workflows/ # GitHub CI workflows
├── src/ # Application source code
├── test/ # Test files
├── .env.example # Sample environment configuration
├── Dockerfile # Docker image setup
├── docker-compose.yml # Docker container orchestration
├── package.json # NPM dependencies and scripts
└── README.md # Project documentation

